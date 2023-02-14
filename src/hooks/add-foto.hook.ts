import { getAccessToken } from '../common/common';
import { useMutation } from '@apollo/client';
import { CREATE_FOTO } from '../graphql-query/query.list';

export const useAddFoto = async (): Promise<any> => {
  const [mutate, { loading }] = useMutation(CREATE_FOTO);

  const createFoto = async (title: string, ref: string, albumId: string): Promise<any> => {
    const {
      data: { foto },
    } = await mutate({
      variables: {
        albumId,
        title,
        ref,
      },
      context: {
        headers: { Cookies: getAccessToken() },
      },
    });
    return foto;
  };

  return {
    createFoto,
    loading,
  };
};
