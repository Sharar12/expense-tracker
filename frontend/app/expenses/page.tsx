'use client';
import { useState, useEffect } from 'react';

const API = 'http://localhost:8000/api/expenses';
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];

interface Expense {
    id: number;
    title: string;
    amount: string;
    category: string;
    date: string;
    notes: string | null;
}

interface FormData {
    title: string;
    amount: string;
    category: string;
    date: string;
    notes: string;
}

const emptyForm: FormData = { title: '', amount: '', category: 'Food', date: '', notes: '' };

export default function ExpenseTracker() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [form, setForm] = useState<FormData>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await fetch(API);
            if (res.ok) setExpenses(await res.json());
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API}/${editingId}` : API;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            resetForm();
            fetchExpenses();
        }
    };

    const handleEdit = (expense: Expense) => {
        setForm({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            notes: expense.notes || '',
        });
        setEditingId(expense.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this expense?')) return;
        const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
        if (res.ok) fetchExpenses();
    };

    const today = () => new Date().toISOString().split('T')[0];

    const openAddForm = () => {
        resetForm();
        setForm({ ...emptyForm, date: today() });
        setShowForm(true);
    };

    if (loading) {
        return <div className="text-gray-400 text-center py-20">Loading...</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Expenses</h2>
                {!showForm && (
                    <button
                        onClick={openAddForm}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        + Add Expense
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-800 p-5 rounded-2xl mb-6 space-y-4 shadow-xl border border-gray-700">
                    <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Expense' : 'New Expense'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Title</label>
                            <input name="title" value={form.title} onChange={handleChange} required
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Amount</label>
                            <input name="amount" type="number" step="0.01" min="0" value={form.amount} onChange={handleChange} required
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Category</label>
                            <select name="category" value={form.category} onChange={handleChange}
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500">
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Date</label>
                            <input name="date" type="date" value={form.date} onChange={handleChange} required
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm block mb-1">Notes (optional)</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 resize-none" />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                            {editingId ? 'Update' : 'Save'}
                        </button>
                        <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No expenses yet. Click "+ Add Expense" to get started.</p>
            ) : (
                <div className="space-y-3">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between shadow-lg border border-gray-700">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-semibold">{expense.title}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-600/20 text-orange-400 border border-orange-600/30">
                                        {expense.category}
                                    </span>
                                </div>
                                <div className="text-gray-400 text-sm mt-1">
                                    {new Date(expense.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    {expense.notes && <span className="ml-3 text-gray-500">· {expense.notes}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-bold text-white">${parseFloat(expense.amount).toFixed(2)}</span>
                                <button onClick={() => handleEdit(expense)} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">Edit</button>
                                <button onClick={() => handleDelete(expense.id)} className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium">Del</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
