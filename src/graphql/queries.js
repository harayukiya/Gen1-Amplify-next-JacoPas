/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMail = /* GraphQL */ `
  query GetMail($id_mail: ID!, $dt_receive: String!) {
    getMail(id_mail: $id_mail, dt_receive: $dt_receive) {
      id_mail
      st_subject
      st_touser
      st_ccuser
      st_contents
      st_attachments
      dt_receive
      dt_insert
      dt_update
      __typename
    }
  }
`;
export const listMails = /* GraphQL */ `
  query ListMails {
    listMails {
      id_mail
      st_subject
      st_touser
      st_ccuser
      st_contents
      st_attachments
      dt_receive
      dt_insert
      dt_update
      __typename
    }
  }
`;
