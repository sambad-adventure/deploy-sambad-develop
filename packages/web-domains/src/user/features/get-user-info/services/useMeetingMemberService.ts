import { useRouter } from 'next/navigation';

import { useCreateMeetingMember, Params } from '@/common/apis/queries/useCreateMeetingMember';
import { useUpdateLastMeeting } from '@/home/common/apis/mutations/useUpdateLastMeeting';

export const useMeetingMemberService = () => {
  const router = useRouter();
  // const setCurrentMeeting = useSetAtom(HomeAtoms.currentMeeting);
  const { mutateAsync: createMeetingMember } = useCreateMeetingMember();
  const { mutateAsync: updateLastMeeting } = useUpdateLastMeeting();

  const participateMeeting = async (params: Params) => {
    const { data } = await createMeetingMember(params, {
      onError: (res) => {
        if (res.response?.status === 404) {
          alert('모임을 찾을 수 없습니다.');
        }
        if (res.response?.status === 409) {
          alert('이미 가입된 모임입니다.');
        }
      },
    });
    await updateLastMeeting(
      { meetingId: data.meetingId },
      {
        onSuccess: () => {
          // 멤버로 가입된 경우
          if (params.role === 'MEMBER') {
            router.push(`/user/member/closing?inviteCode=${params.inviteCode}`);
          }
          // 오너로 가입된 경우
          if (params.role === 'OWNER') {
            router.push(`/meeting/new/closing?inviteCode=${params.inviteCode}`);
          }
        },
      },
    );
  };

  return { participateMeeting };
};
