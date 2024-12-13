import { useEffect, useState } from "react";
import { PaginatedList } from "../../DTOs/PaginatedList";
import { ReviewReadDto } from "../../DTOs/Review/ReviewReadDto";
import { ReviewFilteringModel } from "../../DTOs/Review/ReviewFilteringModel";
import { getReviews } from "../../Api/ReviewApi";
import CommentCard from "../CommentCard/CommentCard";

interface ReviewsListProps {
    movieId: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ movieId }) => {
    const [reviewsPaginatedList, setReviewsPaginatedList] = useState<PaginatedList<ReviewReadDto>>();
    const [reviewsFilteringModel, setReviewsFilteringModel] = useState<ReviewFilteringModel>({
        movieId: movieId,
        sortingField: "",
        pageNumber: 0,
        pageSize: 10,
    });

    const handleChangePage = (pageNumber: number) => {
        setReviewsFilteringModel((prev) => ({ ...prev, pageNumber: pageNumber }));
    };

    const fetchMovieReviews = async () => {
        try {
            const response = await getReviews(reviewsFilteringModel);
            setReviewsPaginatedList(response);
        } catch (err) {
            console.log("Failed to fetch movie reviews.");
        }
    };

    useEffect(() => {
        fetchMovieReviews();
    }, [reviewsFilteringModel]);

    if (!reviewsPaginatedList) {
        return <p>Loading...</p>;
    }

    if (reviewsPaginatedList.totalCount === 0) {
        return <p>There are no comments, be the first to leave a review.</p>;
    }

    return (
        <div className="reviews">
            {reviewsPaginatedList.items.map((review) => (
                <CommentCard
                    key={review.id}
                    createdBy={review.createdByName}
                    comment={review.comment}
                    rank={review.rank}
                    style={{ marginTop: "15px" }}
                />
            ))}
            {reviewsPaginatedList.totalCount > reviewsFilteringModel.pageSize! && (
                <div style={{ display: "flex" }}>
                    {Array.from(
                        { length: Math.ceil(reviewsPaginatedList.totalCount / reviewsFilteringModel.pageSize!) },
                        (_, index) => (
                            <div key={index}>
                                <p
                                    style={{
                                        border: "2px solid",
                                        width: "25px",
                                        marginLeft: "5px",
                                        backgroundColor:
                                            index === reviewsFilteringModel.pageNumber ? "#FF7A00" : "white",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleChangePage(index)}
                                >
                                    {index + 1}
                                </p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewsList;
