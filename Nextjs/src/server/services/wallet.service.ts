
export const walletService = {

  async getBalance() {

    return {
      balance: 0,
    };
  },

  async topup(
    amount: number
  ) {

    return {
      success: true,
      amount,
    };
  },

  async transfer(
    recipientId: number,
    amount: number
  ) {

    return {
      success: true,
      recipientId,
      amount,
    };
  },
};
