import ExpenseTracker from '@/expenses/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Expense Tracker</h1>
      <ExpenseTracker />
    </main>
  );
}
