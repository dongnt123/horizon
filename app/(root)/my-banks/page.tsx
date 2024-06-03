import { redirect } from "next/navigation";

import HeaderBox from "../_components/HeaderBox";
import BankCard from "../_components/bank/BankCard";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { getAccounts } from "@/lib/actions/bank.action";

const MyBanksPage = async () => {

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect('/sign-in');

  const accounts = await getAccounts(loggedInUser.$id);
  if (accounts.length <= 0) redirect('/sign-in');

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox title="My Bank Accounts" subtext="Effortlessly manage your banking activities." />
        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts?.data.map((account: Account) => (
              <BankCard key={account.id} account={account} userName={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanksPage;