import { useState } from 'react';
import {PlanElementT} from "@/app/types/plan-element";

export const usePlans = () => {
    const [plans, setPlans] = useState<PlanElementT[]>([]);

    const addPlan = (plan: PlanElementT) => {
        setPlans([...plans, plan]);
    };

    const removePlan = (plan: PlanElementT) => {
        setPlans(plans.filter((p) => p !== plan));
    };

    return { plans, addPlan, removePlan };
};
