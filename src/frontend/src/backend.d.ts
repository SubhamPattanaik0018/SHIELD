import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface RiderProfile {
    name: string;
    zone: string;
    zoneRisk: ZoneRisk;
    walletBalance: bigint;
}
export interface Payout {
    hours: bigint;
    risk: ZoneRisk;
    zone: string;
    timestamp: Time;
    amount: bigint;
    eventType: DisruptionType;
}
export interface PolicyPurchase {
    risk: ZoneRisk;
    zone: string;
    timestamp: Time;
}
export interface DisruptionEvent {
    timestamp: Time;
    affectedZones: Array<string>;
    eventType: DisruptionType;
}
export interface UserProfile {
    name: string;
    zone: string;
    zoneRisk: ZoneRisk;
}
export enum DisruptionType {
    outage = "outage",
    curfew = "curfew",
    heat = "heat",
    rain = "rain",
    pollution = "pollution"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum ZoneRisk {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculatePayout(hours: bigint, eventType: DisruptionType): Promise<bigint>;
    createDisruption(eventType: DisruptionType, affectedZones: Array<string>): Promise<void>;
    getAllDisruptions(): Promise<Array<DisruptionEvent>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPayoutHistory(): Promise<Array<Payout>>;
    getPayoutsByRider(rider: Principal): Promise<Array<Payout>>;
    getPolicyPurchase(rider: Principal): Promise<PolicyPurchase>;
    getRiderProfile(rider: Principal): Promise<RiderProfile>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWalletBalance(): Promise<bigint>;
    getZoneCoverage(): Promise<Array<[ZoneRisk, bigint]>>;
    getZonePricing(): Promise<Array<[ZoneRisk, bigint]>>;
    isCallerAdmin(): Promise<boolean>;
    purchasePolicy(): Promise<bigint>;
    registerRider(name: string, zone: string, risk: ZoneRisk): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
