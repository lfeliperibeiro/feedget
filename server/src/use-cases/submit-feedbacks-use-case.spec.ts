import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
  {
    create: createFeedbackSpy,
  },
  {
    sendMail: sendEmailSpy,
  }
);

describe('submitFeedbackUseCase', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Any comment',
        screenshot: 'data:image/png;base64/anyway',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Any comment',
        screenshot: 'data:image/png;base64/anyway',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'any type',
        comment: '',
        screenshot: 'data:image/png;base64/anyway',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'any type',
        comment: 'any comment',
        screenshot: 'any.png',
      })
    ).rejects.toThrow();
  });
});
