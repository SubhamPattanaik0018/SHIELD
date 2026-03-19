import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DisruptionType, ZoneRisk } from "../backend.d";
import { useActor } from "./useActor";

export function useWalletBalance() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["walletBalance"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getWalletBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePayoutHistory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["payoutHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPayoutHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllDisruptions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allDisruptions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDisruptions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useZonePricing() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["zonePricing"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getZonePricing();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useZoneCoverage() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["zoneCoverage"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getZoneCoverage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterRider() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      zone,
      risk,
    }: { name: string; zone: string; risk: ZoneRisk }) => {
      if (!actor) throw new Error("No actor");
      return actor.registerRider(name, zone, risk);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function usePurchasePolicy() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.purchasePolicy();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["walletBalance"] });
    },
  });
}

export function useCreateDisruption() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventType,
      affectedZones,
    }: { eventType: DisruptionType; affectedZones: string[] }) => {
      if (!actor) throw new Error("No actor");
      return actor.createDisruption(eventType, affectedZones);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allDisruptions"] });
    },
  });
}
