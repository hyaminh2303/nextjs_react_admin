import { gql } from "@apollo/client";

export const GET_SETTINGS = gql`
  query {
    platformConfiguration {
      basicMembershipPrice
      goldMembershipPrice
      platinumMembershipPrice
      penaltyPercentage
      discountForEmptyLegs
      marginForAdditionalHours
      reservationTimeout
      helicopterLongFlightPunishment
      airplaneShortFlightPunishment
      longShortFlightThreshold
    }
  }
`;