import { redirect } from "next/navigation";

import HeaderBox from "./_components/HeaderBox";
import RightSidebar from "./_components/RightSidebar";
import TotalBalanceBox from "./_components/TotalBalanceBox";
import RecentTransactions from "./_components/transaction/RecentTransactions";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";

const HomePage = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const currentPage = Number(page as string) || 1;

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect('/sign-in');

  const accounts = await getAccounts(loggedInUser.$id);
  if (accounts.length <= 0) redirect('/sign-in');

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount(appwriteItemId);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedInUser?.firstName || "Guest"} subtext="Access and manage your account transactions efficiently." />
          <TotalBalanceBox accounts={accountsData} totalBanks={accounts?.totalBanks} totalCurrentBalance={accounts?.totalCurrentBalance} />
        </header>
        <RecentTransactions accounts={accountsData} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage} />
      </div>
      <RightSidebar user={loggedInUser} transactions={account?.transactions} banks={accountsData.slice(0, 2)} />
    </section>
  )
}

export default HomePage;