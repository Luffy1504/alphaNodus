import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./LocationDetails.css";

const LOCATION_READ_QUERY = gql`
  query LocationRead($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
        address
        alias
        description
        id
        managingOrganization
        name
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
      }
    }
  }
`;

const LocationDetails = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(LOCATION_READ_QUERY, {
    variables: {
      locationReadId: id,
      tenant: "692627ef-fda8-4203-b108-e8e9f52ad410",
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const resource = data.locationRead.resource;
  return (
    <div className="locationInfo">
      {resource.address && (
        <span>
          <h2>Address:</h2>
          <span>{resource.address}</span>
        </span>
      )}
      {resource.alias && (
        <span>
          <h2>Alias:</h2>
          <span>{resource.alias}</span>
        </span>
      )}
      {resource.description && (
        <span>
          <h2>Description:</h2>
          <span>{resource.description}</span>
        </span>
      )}
      {resource.id && (
        <span>
          <h2>ID:</h2>
          <span>{resource.id}</span>
        </span>
      )}
      {resource.managingOrganization && (
        <span>
          <h2>Managing Organization:</h2>
          <span>{resource.managingOrganization}</span>
        </span>
      )}
      {resource.name && (
        <span>
          <h2>Name:</h2>
          <span>{resource.name}</span>
        </span>
      )}
      {resource.npi && (
        <span>
          <h2>NPI:</h2>
          <span>{resource.npi}</span>
        </span>
      )}
      {resource.partOf && (
        <span>
          <h2>Part Of:</h2>
          <span>{resource.partOf}</span>
        </span>
      )}
      {resource.status && (
        <span>
          <h2>Status:</h2>
          <span>{resource.status}</span>
        </span>
      )}
      {resource.tag && (
        <span>
          <h2>Tag:</h2>
          <span>{resource.tag}</span>
        </span>
      )}
      {resource.taxId && (
        <span>
          <h2>Tax ID:</h2>
          <span>{resource.taxId}</span>
        </span>
      )}
      {resource.tenant && (
        <span>
          <h2>Tenant:</h2>
          <span>{resource.tenant}</span>
        </span>
      )}
      {resource.type && (
        <span>
          <h2>Type:</h2>
          <span>{resource.type}</span>
        </span>
      )}
      {resource.updatedAt && (
        <span>
          <h2>Updated At:</h2>
          <span>{new Date(resource.updatedAt).toLocaleString()}</span>
        </span>
      )}
    </div>
  );
};

export default LocationDetails;
