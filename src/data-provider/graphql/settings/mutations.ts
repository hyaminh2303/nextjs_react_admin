import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation UpdatePlatformConfiguration($input: UpdatePlatformConfigurationInput!) {
    updatePlatformConfiguration(input: $input){
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
      errors
    }
  }
`;
