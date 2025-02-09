import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const { contentType } = useContentStore();

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {/* Content Details */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-balance">
            {content?.title || content?.name}
          </h2>
          <p className="mt-2 text-lg">
            {formatReleaseDate(
              content?.release_date || content?.first_air_date
            )}{" "}
            |{" "}
            {content?.adult ? (
              <span className="text-red-600">18+</span>
            ) : (
              <span className="text-green-600">PG-13</span>
            )}
          </p>
          <p className="mt-4 text-lg">{content?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
