import React, { useCallback, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ListingHeader from "../../components/ListingHeader/ListingHeader";
import LocationCard from "../../components/LocationCard/LocationCard";
import { NavLink } from "react-router-dom";
import "./LocationsListing.css";

const LOCATION_LIST = gql`
  query LocationList($tenant: String!, $page: Int!) {
    locationList(tenant: $tenant, page: $page, limit: $limit) {
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

interface Telecom {
  rank: number;
  value: string;
  use: string;
  system: string;
}

interface Resource {
  address: string | null;
  name: string | null;
  npi: string | null;
  status: string | null;
  updatedAt: string | null;
  type: string | null;
  tenant: string | null;
  telecom: Telecom[] | null;
  partOf: string | null;
  taxId: string | null;
  tag: string | null;
  managingOrganization: string | null;
  id: string | null;
  description: string | null;
  alias: string | null;
}

interface LocationListData {
  locationList: {
    resources: Resource[];
  };
}

const LocationListing: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [locationData, setLocationData] = useState<Resource[]>([]);
  const { loading, error, data, fetchMore, refetch } =
    useQuery<LocationListData>(LOCATION_LIST, {
      variables: {
        tenant: "692627ef-fda8-4203-b108-e8e9f52ad410",
        page,
        limit: 4,
      },
    });

  const refreshLocations = (): void => {
    setPage(1);
    refetch();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: { page },
    }).then((fetchMoreResult) => {
      if (fetchMoreResult.data.locationList.resources) {
        setLocationData((prevLocationData) => [
          ...prevLocationData,
          ...fetchMoreResult.data.locationList.resources,
        ]);
      }
    });
  }, [fetchMore, page]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setLocationData(data.locationList.resources);
      } else {
        setLocationData((prevLocationData) => [
          ...prevLocationData,
          ...data.locationList.resources,
        ]);
      }
    }
  }, [data, page]);

  useEffect(() => {
    if (data) {
      setLocationData(data.locationList.resources);
    }
    if (page > 1) {
      handleFetchMore();
    }
  }, [data, handleFetchMore, page]);

  return (
    <div className="locationsList">
      <ListingHeader refreshLocations={refreshLocations} />
      <div className="list" onScroll={handleScroll}>
        {locationData.map((location: Resource) => (
          <NavLink to={`/location-info/${location.id}`} key={location.id}>
            <LocationCard
              name={location.name || ""}
              address={location.address || ""}
              status={location.status || ""}
              mapLink={location.npi || ""}
              phoneNumber="2131233132"
              date={location.updatedAt || ""}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LocationListing;
