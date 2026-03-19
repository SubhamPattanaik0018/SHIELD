import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type ZoneRisk = {
    #low;
    #medium;
    #high;
  };

  module ZoneRisk {
    public func compare(risk1 : ZoneRisk, risk2 : ZoneRisk) : Order.Order {
      switch (risk1, risk2) {
        case (#low, #low) { #equal };
        case (#low, _) { #less };
        case (#medium, #low) { #greater };
        case (#medium, #medium) { #equal };
        case (#medium, #high) { #less };
        case (#high, #high) { #equal };
        case (#high, _) { #greater };
      };
    };
  };

  type RiderProfile = {
    name : Text;
    zone : Text;
    zoneRisk : ZoneRisk;
    walletBalance : Nat;
  };

  module RiderProfile {
    public func compare(profile1 : RiderProfile, profile2 : RiderProfile) : Order.Order {
      Text.compare(profile1.name, profile2.name);
    };

    public func compareByWallet(profile1 : RiderProfile, profile2 : RiderProfile) : Order.Order {
      Nat.compare(profile1.walletBalance, profile2.walletBalance);
    };
  };

  type PolicyPurchase = {
    zone : Text;
    risk : ZoneRisk;
    timestamp : Time.Time;
  };

  module PolicyPurchase {
    public func compare(policy1 : PolicyPurchase, policy2 : PolicyPurchase) : Order.Order {
      switch (Text.compare(policy1.zone, policy2.zone)) {
        case (#equal) { ZoneRisk.compare(policy1.risk, policy2.risk) };
        case (order) { order };
      };
    };
  };

  type DisruptionEvent = {
    eventType : DisruptionType;
    affectedZones : [Text];
    timestamp : Time.Time;
  };

  type DisruptionType = {
    #rain;
    #pollution;
    #heat;
    #curfew;
    #outage;
  };

  module DisruptionType {
    public func compare(eventType1 : DisruptionType, eventType2 : DisruptionType) : Order.Order {
      switch (eventType1, eventType2) {
        case (#rain, #rain) { #equal };
        case (#rain, _) { #less };
        case (#pollution, #rain) { #greater };
        case (#pollution, #pollution) { #equal };
        case (#pollution, _) { #less };
        case (#heat, #rain) { #greater };
        case (#heat, #heat) { #equal };
        case (#heat, _) { #less };
        case (#curfew, #outage) { #less };
        case (#curfew, #curfew) { #equal };
        case (#outage, #outage) { #equal };
        case (#outage, _) { #greater };
      };
    };
  };

  type Payout = {
    zone : Text;
    risk : ZoneRisk;
    hours : Nat;
    amount : Nat;
    eventType : DisruptionType;
    timestamp : Time.Time;
  };

  module Payout {
    public func compare(payout1 : Payout, payout2 : Payout) : Order.Order {
      switch (Text.compare(payout1.zone, payout2.zone)) {
        case (#equal) { ZoneRisk.compare(payout1.risk, payout2.risk) };
        case (order) { order };
      };
    };

    public func compareByAmount(payout1 : Payout, payout2 : Payout) : Order.Order {
      Nat.compare(payout1.amount, payout2.amount);
    };
  };

  public type UserProfile = {
    name : Text;
    zone : Text;
    zoneRisk : ZoneRisk;
  };

  // Storage
  type AppState = {
    riderProfiles : Map.Map<Principal, RiderProfile>;
    policyPurchases : Map.Map<Principal, PolicyPurchase>;
    disruptions : List.List<DisruptionEvent>;
    payouts : Map.Map<Principal, List.List<Payout>>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };
  let accessControlState = AccessControl.initState();
  let state = {
    riderProfiles = Map.empty<Principal, RiderProfile>();
    policyPurchases = Map.empty<Principal, PolicyPurchase>();
    disruptions = List.empty<DisruptionEvent>();
    payouts = Map.empty<Principal, List.List<Payout>>();
    userProfiles = Map.empty<Principal, UserProfile>();
  };
  include MixinAuthorization(accessControlState);

  // Zone pricing (in Rs)
  let zonePricing : Map.Map<ZoneRisk, Nat> = Map.fromIter<ZoneRisk, Nat>([(#low, 20), (#medium, 30), (#high, 40)].values());

  // User profile management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    state.userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    state.userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    state.userProfiles.add(caller, profile);
  };

  // Register rider
  public shared ({ caller }) func registerRider(name : Text, zone : Text, risk : ZoneRisk) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only riders can register");
    };

    let profile : RiderProfile = {
      name;
      zone;
      zoneRisk = risk;
      walletBalance = 0;
    };

    state.riderProfiles.add(caller, profile);

    // Also save to user profile
    let userProfile : UserProfile = {
      name;
      zone;
      zoneRisk = risk;
    };
    state.userProfiles.add(caller, userProfile);
  };

  // Purchase weekly policy
  public shared ({ caller }) func purchasePolicy() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only riders can purchase policies");
    };

    let profile = switch (state.riderProfiles.get(caller)) {
      case (null) { Runtime.trap("Rider profile not found") };
      case (?p) { p };
    };

    let price = switch (zonePricing.get(profile.zoneRisk)) {
      case (null) { Runtime.trap("Risk zone pricing not found") };
      case (?p) { p };
    };

    let purchase : PolicyPurchase = {
      zone = profile.zone;
      risk = profile.zoneRisk;
      timestamp = Time.now();
    };

    state.policyPurchases.add(caller, purchase);
    price;
  };

  // Create disruption event (admin only)
  public shared ({ caller }) func createDisruption(eventType : DisruptionType, affectedZones : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create disruptions");
    };

    let event : DisruptionEvent = {
      eventType;
      affectedZones;
      timestamp = Time.now();
    };

    state.disruptions.add(event);
  };

  // Calculate payout for rider
  public shared ({ caller }) func calculatePayout(hours : Nat, eventType : DisruptionType) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only riders can claim payouts");
    };

    let profile = switch (state.riderProfiles.get(caller)) {
      case (null) { Runtime.trap("Rider profile not found") };
      case (?p) { p };
    };

    // Check if disruption affects rider zone & eventType
    let isAffected = state.disruptions.values().any(
      func(d) {
        d.affectedZones.find(func(zone) { zone == profile.zone }) != null and d.eventType == eventType
      }
    );

    if (not isAffected) {
      Runtime.trap("No active disruption for your zone and event type");
    };

    let maxHours = if (hours > 10) { 10 } else { hours };
    let payoutAmount = maxHours * 120;

    // Check weekly limit
    let currentWeekPayout = switch (state.payouts.get(caller)) {
      case (null) { 0 };
      case (?payoutList) {
        payoutList.values().foldLeft(0, func(total, p) { if (Time.now() - p.timestamp < 604800000000000) { total + p.amount } else { total } });
      };
    };

    if (currentWeekPayout + payoutAmount > 1200) {
      Runtime.trap("Payout exceeds weekly limit");
    };

    let payout : Payout = {
      zone = profile.zone;
      risk = profile.zoneRisk;
      hours = maxHours;
      amount = payoutAmount;
      eventType;
      timestamp = Time.now();
    };

    // Update wallet balance
    let updatedProfile : RiderProfile = {
      name = profile.name;
      zone = profile.zone;
      zoneRisk = profile.zoneRisk;
      walletBalance = profile.walletBalance + payoutAmount;
    };
    state.riderProfiles.add(caller, updatedProfile);

    // Add payout to history
    let currentPayouts = switch (state.payouts.get(caller)) {
      case (null) { List.empty<Payout>() };
      case (?existing) { existing };
    };

    currentPayouts.add(payout);
    state.payouts.add(caller, currentPayouts);

    payoutAmount;
  };

  // Get rider wallet balance
  public query ({ caller }) func getWalletBalance() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only riders can check balance");
    };
    let profile = switch (state.riderProfiles.get(caller)) {
      case (null) { Runtime.trap("Rider profile not found") };
      case (?p) { p };
    };
    profile.walletBalance;
  };

  // Get payout history
  public query ({ caller }) func getPayoutHistory() : async [Payout] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only riders can view history");
    };
    let currentPayouts = switch (state.payouts.get(caller)) {
      case (null) { List.empty<Payout>() };
      case (?existing) { existing };
    };

    currentPayouts.values().toArray().sort();
  };

  // Get zone pricing (public information)
  public query func getZonePricing() : async [(ZoneRisk, Nat)] {
    zonePricing.toArray();
  };

  // Get zone coverage count (admin only - business metrics)
  public query ({ caller }) func getZoneCoverage() : async [(ZoneRisk, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can view zone coverage statistics");
    };

    let lowCount = state.riderProfiles.values().filter(func(p) { p.zoneRisk == #low }).toArray().size();
    let mediumCount = state.riderProfiles.values().filter(func(p) { p.zoneRisk == #medium }).toArray().size();
    let highCount = state.riderProfiles.values().filter(func(p) { p.zoneRisk == #high }).toArray().size();

    [(#low, lowCount), (#medium, mediumCount), (#high, highCount)];
  };

  // Get all disruption events (admin only)
  public query ({ caller }) func getAllDisruptions() : async [DisruptionEvent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can view disruptions");
    };
    state.disruptions.toArray();
  };

  // Get rider profile by principal (ownership-based)
  public query ({ caller }) func getRiderProfile(rider : Principal) : async RiderProfile {
    if (caller != rider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (state.riderProfiles.get(rider)) {
      case (null) { Runtime.trap("Rider not found") };
      case (?p) { p };
    };
  };

  // Get policy purchase (ownership-based)
  public query ({ caller }) func getPolicyPurchase(rider : Principal) : async PolicyPurchase {
    if (caller != rider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own policy");
    };
    switch (state.policyPurchases.get(rider)) {
      case (null) { Runtime.trap("Policy purchase not found") };
      case (?p) { p };
    };
  };

  // Get payouts by rider (ownership-based)
  public query ({ caller }) func getPayoutsByRider(rider : Principal) : async [Payout] {
    if (caller != rider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own payouts");
    };
    switch (state.payouts.get(rider)) {
      case (null) { Runtime.trap("No payouts found") };
      case (?payouts) {
        payouts.values().toArray();
      };
    };
  };
};
