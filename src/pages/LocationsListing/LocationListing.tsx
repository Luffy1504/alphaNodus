import LocationCard from "../../components/LocationCard/LocationCard";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./LocationsListing.css";
import ListingHeader from "../../components/ListingHeader/ListingHeader";

const LOCATION_LIST = gql`
  query LocationList($tenant: String!, $page: Int!) {
    locationList(tenant: $tenant, page: $page) {
      resources {
        address
        name
        npi
        status
        updatedAt
        type
        tenant
        telecom {
          rank
          value
          use
          system
        }
        partOf
        taxId
        tag
        managingOrganization
        id
        description
        alias
      }
    }
  }
`;

const LocationListing = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data, fetchMore, refetch } = useQuery(LOCATION_LIST, {
    variables: { tenant: "692627ef-fda8-4203-b108-e8e9f52ad410", page },
  });

  const refreshLocations = () => {
    setPage(1);
    refetch();
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: {
          page,
        },
      });
    }
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("Data -> ", data);
  return (
    <div className="locationsList">
      <ListingHeader refreshLocations={refreshLocations} />

      {data.locationList.resources.map((location: any) => (
        <LocationCard
          key={location.id}
          name={location.name}
          address={location.address}
          status={location.status}
          mapLink={location.npi}
          phoneNumber="2131233132"
          date={location.updatedAt}
        />
      ))}
    </div>
  );
};

export default LocationListing;
