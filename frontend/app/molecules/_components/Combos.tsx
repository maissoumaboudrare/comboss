"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Section } from "../../atoms/_components/commons/Section";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ComboFilters } from "../../atoms/_components/combo/ComboFilters";

import { toast } from "react-toastify";
import { Combo } from "@/types/combo";
import {
  deleteCombo,
  fetchCombos,
  toggleFavorite,
  toggleLike,
} from "@/utils/api";
import ComboCard from "@/app/atoms/_components/combo/ComboCard";
import ComboCardEmpty from "@/app/atoms/_components/combo/ComboCardEmpty";
import { useCombos } from "@/context/ComboContext";

type CombosListProps = {
  characterID: number;
};

export const Combos = ({ characterID }: CombosListProps) => {
  const { user, isAuthenticated } = useAuth();
  const { combos, updateCombos } = useCombos();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredCombos, setFilteredCombos] = useState<Combo[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "latest";

  useEffect(() => {
    const loadCombos = async () => {
      try {
        const data = await fetchCombos(characterID);
        updateCombos(data);
      } catch (error) {
        console.error("Error fetching combos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCombos()
  }, [characterID, isAuthenticated])



  useEffect(() => {
    if (!searchParams) return;

    const applyFilter = () => {
      switch (filter) {
        case "latest":
          setFilteredCombos(
            [...combos].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          );
          break;
        case "best":
          setFilteredCombos(
            [...combos].sort((a, b) => b.likeCount - a.likeCount)
          );
          break;
        case "added":
          setFilteredCombos(
            combos.filter((combo) => combo.userID === user?.userID)
          );
          break;
        case "saved":
          setFilteredCombos(combos.filter((combo) => combo.isFavorite));
          break;
        default:
          setFilteredCombos(combos);
      }
    };

    applyFilter();
  }, [combos, filter, user?.userID, searchParams]);

  const handleFilterChange = (newFilter: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("filter", newFilter);
    router.push(currentUrl.toString());
  };

  const handleDeleteCombo = async (comboID: number) => {
    try {
      await deleteCombo(comboID);
      const updatedCombos = combos.filter((combo) => combo.comboID !== comboID);
      updateCombos(updatedCombos);
      toast.success("Combo deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting combo:", error);
      toast.error("Error deleting combo !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleToggleLike = async (comboID: number, isLiked: boolean) => {
    if (!isAuthenticated) {
      toast.info(
        "Hey there! You need to sign in to like a combo. Join us and start liking!",
        {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      router.push("/login");
      return;
    }
     try {
      const method = isLiked ? "DELETE" : "POST";
      await toggleLike(comboID, method);
      const updatedCombo = await fetchCombos(characterID);
      updateCombos(updatedCombo);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleToggleFavorite = async (comboID: number, isFavorite: boolean) => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      await toggleFavorite(comboID, method);
      updateCombos(
        combos.map((combo) =>
          combo.comboID === comboID
            ? {
                ...combo,
                isFavorite: !combo.isFavorite,
              }
            : combo
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleOpenVideoDialog = (videoURL: string | undefined) => {
    if (videoURL) {
      setSelectedVideoUrl(videoURL);
    }
  };

  return (
    <Section className="m-0 flex flex-col pr-0 gap-4">
      <ComboFilters
        onFilterChange={handleFilterChange}
        isAuthenticated={isAuthenticated}
        activeFilter={filter}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredCombos.length !== 0 ? (
        filteredCombos.map((combo) => (
          <ComboCard
            key={combo.comboID}
            combo={combo}
            isAuthenticated={isAuthenticated}
            user={user}
            handleToggleLike={handleToggleLike}
            handleToggleFavorite={handleToggleFavorite}
            handleDeleteCombo={handleDeleteCombo}
            handleOpenVideoDialog={handleOpenVideoDialog}
          />
        ))
      ) : (
        <ComboCardEmpty />
      )}
    </Section>
  );
};
