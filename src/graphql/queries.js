/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMail = /* GraphQL */ `
  query GetMail($id_mail: String!) {
    getMail(id_mail: $id_mail) {
      id_mail
      st_fromaddress
      st_touser
      st_ccuser
      st_subject
      st_contents
      fg_attachments
      st_attachments
      fg_unzipped
      st_password
      st_objectkeys
      dt_receive
      dt_insert
      dt_update
      __typename
    }
  }
`;
export const listMails = /* GraphQL */ `
  query ListMails(
    $filter: TableMailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id_mail
        st_fromaddress
        st_touser
        st_ccuser
        st_subject
        st_contents
        fg_attachments
        st_attachments
        fg_unzipped
        st_password
        st_objectkeys
        dt_receive
        dt_insert
        dt_update
        __typename
      }
      nextToken
      __typename
    }
  }
`;
