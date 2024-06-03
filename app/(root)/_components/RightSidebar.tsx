import Image from "next/image";
import Link from "next/link";

import BankCard from "./bank/BankCard";
import { cn, countTransactionCategories } from "@/lib/utils";
import { topCategoryStyles } from "@/constants";
import { Progress } from "@/components/ui/progress";

const Category = ({ category }: { category: CategoryCount }) => {
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] || topCategoryStyles.default;

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn("font-medium", main)}>{category.name}</h2>
          <h3 className={cn("font-normal", count)}>{category.count}</h3>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className={cn("h-2 w-full", progressBg)}
          //@ts-ignore
          indicatorClassName={cn("h-2 w-full", indicator)}
        />
      </div>
    </div>
  );
}

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {

  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">{user.lastName[0]}</span>
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" alt="Add" width={20} height={20} />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>
        {banks.length > 0 && (
          <div className="relative flex flex-col flex-1 items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard key={banks[0].$id} account={banks[0]} userName={user.name} showBalance={false} />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard key={banks[1].$id} account={banks[1]} userName={user.name} showBalance={false} />
              </div>
            )}
          </div>
        )}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top Categories</h2>
          <div className="space-y-5">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar;