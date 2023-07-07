import React from "react";
import Button from "../Button/Button";
import refreshIcon from "../../assets/refreshIcon.svg";
import addIcon from "../../assets/addIcon.svg";
import "./ListingHeader.css";

interface ListingHeaderProps {
    refreshLocations: () => void;
  }
  
  const ListingHeader: React.FC<ListingHeaderProps> = ({ refreshLocations }) => {
    return (
      <div className="listingHeader">
        <Button className="refreshBtn" imgSrc={refreshIcon} onClick={refreshLocations} />
        <span>Locations</span>
        <img src={addIcon} alt="add location" />
      </div>
    );
  };
  
  export default ListingHeader;
  
