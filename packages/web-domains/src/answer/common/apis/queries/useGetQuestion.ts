import { UseQueryOptionsExcludedQueryKey } from '@sambad/types-utils/tanstack';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { Http } from '@/common/apis/base.api';

import { QuestionResponseType } from '../schema/Question.schema';

type Params = { meetingId: number };

interface Args {
  params: Params;
  options?: UseQueryOptionsExcludedQueryKey<QuestionResponseType>;
}

export const GET_QUESTION_QUERY_KEY = 'GET_QUESTION_QUERY_KEY';

export const useGetQuestion = ({ params, options }: Args) => {
  return useQuery({
    queryKey: [GET_QUESTION_QUERY_KEY, params.meetingId],
    queryFn: async () => {
      try {
        const data = await getQuestion(params);
        return data;
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      }
    },
    ...options,
  });
};

export const getGetQuestionPrefetch = (params: Params, queryClient: QueryClient, cookie: ReadonlyRequestCookies) => {
  const prefetch = queryClient.prefetchQuery({
    queryKey: [GET_QUESTION_QUERY_KEY, params.meetingId],
    queryFn: async () => {
      try {
        const data = await getQuestion(params, cookie);
        return data;
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      }
    },
  });

  return prefetch;
};

export async function getQuestion(params: Params, cookie?: ReadonlyRequestCookies): Promise<QuestionResponseType> {
  const { meetingId } = params;

  const data = await Http.GET<QuestionResponseType>(`/v1/meetings/${meetingId}/questions/active/answers`, {
    headers: {
      Cookie: cookie?.toString(),
    },
  });
  return data;
}
