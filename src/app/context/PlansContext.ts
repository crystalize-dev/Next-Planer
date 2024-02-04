'use client'
import { createContext } from 'react';
import {PlanElementT} from "@/app/types/plan-element";

type PlansContextT = {
    plans: PlanElementT[];
    addPlan: (plan: PlanElementT) => void;
    removePlan: (plan: PlanElementT) => void;
};

export const PlansContext = createContext<PlansContextT>({
    plans: [],
    addPlan: () => {},
    removePlan: () => {}
});
