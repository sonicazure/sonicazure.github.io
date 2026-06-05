import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import {
  HomePage,
  BlogPage,
  BooksPage,
  AnnualBooksPage,
  ReadingHistoryPage,
  InfluentialPage,
  MusicPage,
  AnnualMusicPage,
  LivePage,
  ResonancePage,
  ResearchPage,
} from './pages';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/books" element={<BooksPage />}>
          <Route index element={<Navigate to="annual" replace />} />
          <Route path="annual" element={<AnnualBooksPage />} />
          <Route path="history" element={<ReadingHistoryPage />} />
          <Route path="influential" element={<InfluentialPage />} />
        </Route>
        <Route path="/music" element={<MusicPage />}>
          <Route index element={<Navigate to="annual" replace />} />
          <Route path="annual" element={<AnnualMusicPage />} />
          <Route path="live" element={<LivePage />} />
          <Route path="resonance" element={<ResonancePage />} />
        </Route>
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/annual-review" element={<Navigate to="/books/history" replace />} />
      </Route>
    </Routes>
  );
}
