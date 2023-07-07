import React from "react";
import "./LocationCard.css";
import calenderIcon from "../../assets/calenderIcon.svg";
import clockIcon from "../../assets/clockIcon.svg";

interface CardProps {
  name: string;
  address: string;
  status: string,
  mapLink: string;
  phoneNumber: string;
  date: string;
}

const LocationCard: React.FC<CardProps> = ({
  name,
  address,
  status,
  mapLink,
  phoneNumber,
  date,
}) => {
  const [copySuccess, setCopySuccess] = React.useState("");

  const handleCopy = () => {
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("");
    }, 1000);
  };

  return (
    <div className="card">
      <div className="header">
        <div className="headings">
          <span className="locationName">{name}</span>
          <span className="locationAddress">{address}</span>
        </div>
        <span className="status">{status}</span>
      </div>
      <div className="lastUpdated">
        <div>
            <img src={calenderIcon} alt="" />
            <img src={clockIcon} alt="" />
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default LocationCard;
