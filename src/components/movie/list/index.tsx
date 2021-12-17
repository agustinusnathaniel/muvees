import { Box, Button, Heading } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MoviesContainer from "components/movie/MoviesContainer";
import SearchBox from "components/movie/SearchBox";
import { useMovieList } from "services/tmdb/movie/list";
import { ListType, MovieListParams } from "services/tmdb/movie/list/types";

import PageNavButtons, { PageNavButtonProps } from "./PageNavButtons";
import { MovieListModeKey } from "./types";

type MovieListContainerProps = {
  listMode: MovieListModeKey;
};

const MovieListContainer = ({ listMode }: MovieListContainerProps) => {
  const router = useRouter();
  const {
    query: { section, page: qPage, query, genre },
  } = router;
  const page = qPage ? Number(qPage) : 0;

  const [totalPages, setTotalPages] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const [queries, setQueries] = useState<MovieListParams>();

  useEffect(() => {
    if (page || query || genre) {
      switch (listMode) {
        case "section":
          setQueries({
            page,
          });
          break;
        case "search":
          setQueries({
            page,
            query: query as string,
          });
          break;
        case "discover":
          setQueries({
            page,
            with_genres: genre as string,
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, genre]);

  const { data, isLoading } = useMovieList(
    listMode === "section" ? (section as ListType) : undefined,
    queries,
    undefined,
    listMode === "search" ? shouldFetch : undefined
  );

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (data && data.total_pages) {
      setTotalPages(data.total_pages);
    }
  }, [data]);

  useEffect(() => {
    if (
      (listMode === "search" && query) ||
      (listMode === "discover" && genre)
    ) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [listMode, query, genre]);

  const pageNavButtonProps: PageNavButtonProps = {
    isLoading,
    page,
    totalPages,
    results: data?.results,
    listMode,
  };

  const generatePageHeadTitle = () => {
    switch (listMode) {
      case "section":
        return `${section} | muvees`;
      case "search":
        return `muvees | search: "${decodeURI(query as string)}"`;
      default:
        return `muvees`;
    }
  };

  const renderMovieList = () => {
    if (listMode === "search" && !shouldFetch) {
      return null;
    }

    return (
      <>
        {listMode !== "search" && (
          <Heading textTransform="capitalize">
            {section && (section as string).replace("_", " ")}
          </Heading>
        )}
        <PageNavButtons {...pageNavButtonProps} />
        <MoviesContainer movies={data && data.results} isLoading={isLoading} />
        <PageNavButtons {...pageNavButtonProps} />
      </>
    );
  };

  return (
    <Box mb={8} w="full" paddingX={8}>
      {data && <NextSeo title={generatePageHeadTitle()} />}
      <Button borderRadius={24} isFullWidth onClick={() => router.push("/")}>
        back
      </Button>

      {listMode === "search" && <SearchBox />}

      <Box marginY={8}>{renderMovieList()}</Box>
    </Box>
  );
};

export default MovieListContainer;
