import {
  fetchGamesFromDatabase,
  fetchArticlesFromDatabase,
} from "@/libs/api/apiServer";
import DashboardClient from "@/components/DashboardClient";

export default async function Dashboard() {
  // Fetch data server-side
  const initialGames = await fetchGamesFromDatabase();
  const initialNews = await fetchArticlesFromDatabase(); // Fetch news articles

  return (
    <div>
      {/* Pass initial games and news data to the client-side component */}
      <DashboardClient initialGames={initialGames} initialNews={initialNews} />
    </div>
  );
}
