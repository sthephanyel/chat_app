import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthRoutes } from "./auth.routes";
import { HomeRoutes } from "./home.routes";
import { AppTabBar } from "./tab.routes";
import { supabaseClient } from "../lib/libSupabase";
import { Session } from '@supabase/supabase-js'

export function Routes() {
    return (
        <AuthRoutes/>
        // <AppTabBar/>
    )
}