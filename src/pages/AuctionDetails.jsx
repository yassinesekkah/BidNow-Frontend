import { useParams } from "react-router-dom";

function AuctionDetails(){
    const { id } = useParams();

    return (
        <h1>Auction {id}</h1>
    );
}
export default AuctionDetails;