import {ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";

export function useMultiStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const navigate = useNavigate();

    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) {
                navigate('/results');
                return i;
            }
            return i + 1;
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) {
                return i;
            }
            return i - 1;
        })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        currentStep: steps[currentStepIndex],
        goTo,
        next,
        back,
        steps,
        isFirstStep: currentStepIndex === 0
    }
}