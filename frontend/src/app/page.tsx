import QuickLogin from "@/components/organisms/auth/QuickLogin/QuickLogin";
import HomeTemplate from "@/components/templates/HomeTemplate/HomeTemplate";
import { getHomePage } from "@/features/home/queries/getHomePage";

export default async function Home() {
  const data = await getHomePage();

  return <HomeTemplate data={data} login={<QuickLogin />} />;
}
