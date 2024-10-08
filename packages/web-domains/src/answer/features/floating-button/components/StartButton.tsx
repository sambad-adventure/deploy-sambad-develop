'use client';

import { Button, Txt } from '@sambad/sds/components';
import { colors } from '@sambad/sds/theme';
import Link from 'next/link';

interface StartButtonProps {
  questionId: number;
  meetingId?: number;
}

export const StartButton = ({ questionId, meetingId }: StartButtonProps) => {
  return (
    <div
      css={{
        position: 'fixed',
        bottom: '40px',
        margin: '0 auto',
        width: '100%',
        maxWidth: '600px',
        padding: '0 20px',
      }}
    >
      <Link href={`/${meetingId}/answer/${questionId}`}>
        <Button size="large">
          <Txt typography="subtitle1" color={colors.white}>
            시작하기
          </Txt>
        </Button>
      </Link>
    </div>
  );
};
