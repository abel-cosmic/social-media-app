// graphql/auth.ts
import { USER_FRAGMENT } from '@/types/graphql/fragments';
import { gql } from '@apollo/client';


export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;