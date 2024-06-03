import { redirect } from "next/navigation";

import HeaderBox from "../_components/HeaderBox";
import PaymentTransferForm from "./_components/PaymentTransferForm";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { getAccounts } from "@/lib/actions/bank.action";

const PaymentTransferPage = async () => {

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect('/sign-in');

  const accounts = await getAccounts(loggedInUser.$id);
  if (accounts.length <= 0) redirect('/sign-in');

  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Please provide any specific details or notes related to the payment transfer." />
      <div className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </div>
    </section>
  )
}

export default PaymentTransferPage;