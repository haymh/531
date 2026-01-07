import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useOneRepMax } from './hooks/useOneRepMax';
import { useWorkoutProgress } from './hooks/useWorkoutProgress';
import { useCycleManager } from './hooks/useCycleManager';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import useOnboarding from './hooks/useOnboarding';
import BottomNav from './components/BottomNav';
import PullToRefresh from './components/PullToRefresh';
import OnlineStatusIndicator from './components/OnlineStatusIndicator';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import WorkoutPage from './pages/WorkoutPage';
import ProgressionPage from './pages/ProgressionPage';
import LearnPage from './pages/LearnPage';
import SettingsPage from './pages/SettingsPage';
import './styles/global.css';

function App() {
  const { isOnline, isServerReachable } = useOnlineStatus();
  const oneRepMaxData = useOneRepMax();
  const cycleData = useCycleManager(oneRepMaxData.oneRepMaxes, oneRepMaxData.updateAllMaxes);
  const workoutProgressData = useWorkoutProgress(cycleData.incrementCycle, cycleData.advanceWeek, cycleData.setStartDate);
  const { isOnboardingComplete, completeOnboarding, skipOnboarding, restartOnboarding } = useOnboarding();

  const canRefresh = isOnline && isServerReachable;

  // Show onboarding if not completed
  const showOnboarding = !isOnboardingComplete;

  const handleRefresh = async () => {
    // Check if online before attempting reload
    if (!navigator.onLine) {
      // If offline, just resolve immediately without reloading
      return Promise.resolve();
    }

    // Trigger a re-render by forcing hooks to reload from localStorage
    return new Promise((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 300);
    });
  };

  return (
    <BrowserRouter>
      {showOnboarding && (
        <OnboardingFlow
          oneRepMaxData={oneRepMaxData}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      )}
      <OnlineStatusIndicator />
      <div className="container">
        <PullToRefresh onRefresh={handleRefresh} enabled={canRefresh}>


          <div style={{ paddingBottom: '0', minHeight: '100%' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <WorkoutPage
                    oneRepMaxData={oneRepMaxData}
                    workoutProgressData={workoutProgressData}
                    cycleData={cycleData}
                  />
                }
              />
              <Route
                path="/progression"
                element={
                  <ProgressionPage
                    oneRepMaxes={oneRepMaxData.oneRepMaxes}
                    cycles={cycleData.cycles}
                    startDates={cycleData.startDates}
                    workoutProgressData={workoutProgressData}
                  />
                }
              />
              <Route
                path="/learn"
                element={<LearnPage />}
              />

              <Route
                path="/settings"
                element={
                  <SettingsPage
                    oneRepMaxData={oneRepMaxData}
                  />
                }
              />
            </Routes>
          </div>
        </PullToRefresh>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
