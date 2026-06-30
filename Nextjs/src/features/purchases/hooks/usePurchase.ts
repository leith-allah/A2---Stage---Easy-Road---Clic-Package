
"use client";

import { useState } from "react";

import { createPurchase }
from "../services/purchase.service";

export function usePurchase() {

  const [loading, setLoading] =
    useState(false);

  async function purchase(data: any) {

    try {

      setLoading(true);

      return await createPurchase(data);

    } finally {

      setLoading(false);

    }

  }

  return {

    purchase,

    loading,

  };

}
