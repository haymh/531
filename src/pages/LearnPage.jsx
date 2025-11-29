import React, { useState } from 'react';
import LiftIcon from '../components/LiftIcon';
import squatImg from '../assets/squat_form.png';
import benchImg from '../assets/bench_press_form.png';
import deadliftImg from '../assets/deadlift_form.png';
import overheadImg from '../assets/overhead_press_form.png';
import pullupImg from '../assets/pullup_form.png';
import dipImg from '../assets/dip_form.png';
import rowImg from '../assets/barbell_row_form.png';

const LearnPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');

    const guides = [
        // LEGS
        {
            lift: 'Squat',
            muscleGroup: 'Legs',
            image: squatImg,
            breakdown: [
                '**Setup**: Position bar on upper back, feet shoulder-width apart, toes slightly out.',
                '**Descent**: Take a deep breath, brace core. Break at hips and knees simultaneously, keeping chest up.',
                '**Bottom**: Descend until thighs are parallel or below, maintaining neutral spine.',
                '**Ascent**: Drive through heels, extend hips and knees together. Exhale at top.'
            ],
            keyPoints: [
                'Feet shoulder-width apart, toes slightly out.',
                'Keep chest up and back straight.',
                'Break at hips and knees simultaneously.',
                'Go down until thighs are at least parallel to floor.',
                'Drive up through your heels.'
            ],
            mistakes: [
                'Knees caving inward.',
                'Heels lifting off the ground.',
                'Not going deep enough (half reps).'
            ],
            videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8'
        },
        {
            lift: 'Deadlift',
            muscleGroup: 'Legs',
            image: deadliftImg,
            breakdown: [
                '**Setup**: Bar over mid-foot, feet hip-width. Bend down and grip bar just outside legs.',
                '**Position**: Lower hips, chest up, shoulders over or slightly in front of bar. Back neutral.',
                '**Pull**: Take a breath, brace core. Pull slack out of bar, then drive through floor with legs.',
                '**Lockout**: Extend hips forward to stand tall. Lower with control, keeping bar close to body.'
            ],
            keyPoints: [
                'Feet hip-width apart, bar over mid-foot.',
                'Grip bar just outside legs.',
                'Hips lower than shoulders, chest up.',
                'Pull slack out of the bar.',
                'Drive floor away with legs, then extend hips.'
            ],
            mistakes: [
                'Rounding the lower back (cat back).',
                'Jerking the bar off the floor.',
                'Squatting the weight up (hips too low).'
            ],
            videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q'
        },
        {
            lift: 'Lunges',
            muscleGroup: 'Legs',
            image: null,
            breakdown: [
                '**Setup**: Stand tall, feet hip-width apart. Hold dumbbells at sides or barbell on back.',
                '**Step**: Take a large step forward with one leg, keeping torso upright.',
                '**Descent**: Lower hips until both knees are at 90°. Front knee stays behind toes.',
                '**Return**: Push through front heel to return to starting position. Alternate legs.'
            ],
            keyPoints: [
                'Step forward with one leg.',
                'Lower hips until both knees are at 90°.',
                'Keep torso upright.',
                'Front knee should not go past toes.',
                'Push back to starting position.'
            ],
            mistakes: [
                'Leaning too far forward.',
                'Knee caving inward.',
                'Taking too short of a step.'
            ],
            videoUrl: 'https://www.youtube.com/embed/QOVaHwm-Q6U'
        },
        {
            lift: 'Bulgarian Split Squat',
            muscleGroup: 'Legs',
            image: null,
            breakdown: [
                '**Setup**: Place rear foot on bench behind you. Front foot 2-3 feet forward.',
                '**Descent**: Lower hips straight down until front thigh is parallel to ground.',
                '**Bottom**: Keep torso upright, front knee tracking over toes.',
                '**Ascent**: Push through front heel to return to start. Complete reps, then switch legs.'
            ],
            keyPoints: [
                'Rear foot elevated on bench.',
                'Front foot far enough forward.',
                'Lower straight down, not forward.',
                'Keep torso upright.',
                'Push through front heel.'
            ],
            mistakes: [
                'Front foot too close to bench.',
                'Leaning too far forward.',
                'Knee caving inward.'
            ],
            videoUrl: 'https://www.youtube.com/embed/2C-uNgKwPLE'
        },
        // CHEST
        {
            lift: 'Bench Press',
            muscleGroup: 'Chest',
            image: benchImg,
            breakdown: [
                '**Setup**: Lie on bench, eyes under bar. Grip slightly wider than shoulders, feet flat on floor.',
                '**Unrack**: Take a deep breath, lift bar to arms\' length over chest.',
                '**Descent**: Lower bar to mid-chest with control, elbows at ~45°. Keep shoulder blades squeezed.',
                '**Press**: Drive bar up and slightly back toward face. Exhale at top, lock out arms.'
            ],
            keyPoints: [
                'Eyes under the bar.',
                'Grip slightly wider than shoulder-width.',
                'Arch your back slightly, keep feet planted.',
                'Lower bar to mid-chest (nipple line).',
                'Press up and slightly back towards face.'
            ],
            mistakes: [
                'Elbows flaring out too wide (keep them tucked ~45°).',
                'Bouncing the bar off the chest.',
                'Lifting hips off the bench.'
            ],
            videoUrl: 'https://www.youtube.com/embed/4Y2ZdHCOXok'
        },
        {
            lift: 'Dips',
            muscleGroup: 'Chest',
            image: dipImg,
            breakdown: [
                '**Setup**: Grip parallel bars, jump or step up to support position with arms locked.',
                '**Descent**: Lean slightly forward, lower body by bending elbows until shoulders are below elbows.',
                '**Bottom**: Keep elbows tucked, core tight. Don\'t go too deep to protect shoulders.',
                '**Press**: Push back up to lockout, maintaining slight forward lean. Repeat.'
            ],
            keyPoints: [
                'Keep chest slightly forward.',
                'Lower until shoulders are below elbows.',
                'Keep elbows tucked in, not flared.',
                'Press back up to lockout.',
                'Keep core tight.'
            ],
            mistakes: [
                'Going too deep (bad for shoulders).',
                'Not going deep enough.',
                'Flaring elbows out too much.'
            ],
            videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As'
        },
        {
            lift: 'Incline Bench Press',
            muscleGroup: 'Chest',
            image: null,
            breakdown: [
                '**Setup**: Set bench to 30-45° incline. Lie back, grip bar slightly wider than shoulders.',
                '**Unrack**: Lift bar to arms\' length over upper chest.',
                '**Descent**: Lower bar to upper chest with control, elbows at ~45°.',
                '**Press**: Drive bar straight up. Lock out at top, exhale.'
            ],
            keyPoints: [
                'Bench at 30-45 degree angle.',
                'Lower to upper chest.',
                'Keep elbows at 45 degrees.',
                'Press straight up.',
                'Maintain shoulder blade retraction.'
            ],
            mistakes: [
                'Bench angle too steep (over 45°).',
                'Lowering to lower chest instead of upper.',
                'Excessive arching.'
            ],
            videoUrl: 'https://www.youtube.com/embed/SrqOu55lrYU'
        },
        {
            lift: 'Push-ups',
            muscleGroup: 'Chest',
            image: null,
            breakdown: [
                '**Setup**: Hands slightly wider than shoulders, body in straight line from head to heels.',
                '**Descent**: Lower body until chest nearly touches ground, elbows at ~45°.',
                '**Bottom**: Maintain straight body line, core engaged.',
                '**Press**: Push back up to starting position. Keep body rigid throughout.'
            ],
            keyPoints: [
                'Hands slightly wider than shoulders.',
                'Body in straight line.',
                'Lower until chest nearly touches ground.',
                'Keep core engaged.',
                'Full range of motion.'
            ],
            mistakes: [
                'Sagging hips.',
                'Flaring elbows out wide.',
                'Not going deep enough.'
            ],
            videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4'
        },
        // BACK
        {
            lift: 'Pull-ups',
            muscleGroup: 'Back',
            image: pullupImg,
            breakdown: [
                '**Setup**: Grip bar slightly wider than shoulders, palms facing away.',
                '**Starting Position**: Hang with arms fully extended, shoulders engaged (not relaxed).',
                '**Pull**: Pull chest toward bar, leading with elbows. Squeeze shoulder blades together.',
                '**Descent**: Lower yourself with control back to dead hang. Repeat.'
            ],
            keyPoints: [
                'Grip bar slightly wider than shoulders.',
                'Start from a dead hang (arms fully extended).',
                'Pull chest up to the bar.',
                'Squeeze shoulder blades together at the top.',
                'Lower yourself under control.'
            ],
            mistakes: [
                'Kipping or swinging excessively.',
                'Not going all the way down (half reps).',
                'Rounding shoulders forward.'
            ],
            videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g'
        },
        {
            lift: 'Barbell Rows',
            muscleGroup: 'Back',
            image: rowImg,
            breakdown: [
                '**Setup**: Deadlift bar to standing. Bend at hips to ~45° angle, slight knee bend.',
                '**Starting Position**: Arms hanging straight down, back flat, chest up. Core braced.',
                '**Pull**: Pull bar to lower chest/upper abs, leading with elbows. Squeeze back at top.',
                '**Lower**: Lower bar with control to starting position. Keep torso angle consistent.'
            ],
            keyPoints: [
                'Bend over at hips (torso ~45° to parallel).',
                'Keep back straight, chest up.',
                'Pull bar to lower chest/upper abs.',
                'Squeeze back muscles at the top.',
                'Lower bar under control.'
            ],
            mistakes: [
                'Using momentum (jerking the weight).',
                'Rounding the lower back.',
                'Standing too upright.'
            ],
            videoUrl: 'https://www.youtube.com/embed/FWJR5Ve8bnQ'
        },
        {
            lift: 'Lat Pulldown',
            muscleGroup: 'Back',
            image: null,
            breakdown: [
                '**Setup**: Sit at machine, adjust thigh pad. Grip bar wider than shoulders.',
                '**Pull**: Pull bar down to upper chest, leading with elbows. Lean back slightly.',
                '**Bottom**: Squeeze shoulder blades together at bottom.',
                '**Return**: Extend arms back up with control. Don\'t let weight stack touch between reps.'
            ],
            keyPoints: [
                'Grip wider than shoulders.',
                'Pull to upper chest.',
                'Lean back slightly (10-15°).',
                'Squeeze shoulder blades.',
                'Control the negative.'
            ],
            mistakes: [
                'Pulling behind neck.',
                'Using too much momentum.',
                'Not achieving full range of motion.'
            ],
            videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc'
        },
        {
            lift: 'Single-Arm Dumbbell Row',
            muscleGroup: 'Back',
            image: null,
            breakdown: [
                '**Setup**: Place knee and hand on bench. Other foot on ground, dumbbell in free hand.',
                '**Starting Position**: Back flat, arm hanging straight down.',
                '**Pull**: Pull dumbbell to hip, leading with elbow. Squeeze back at top.',
                '**Lower**: Lower dumbbell with control. Complete reps, then switch sides.'
            ],
            keyPoints: [
                'Back flat and parallel to ground.',
                'Pull to hip, not shoulder.',
                'Lead with elbow.',
                'Minimize torso rotation.',
                'Full stretch at bottom.'
            ],
            mistakes: [
                'Rotating torso excessively.',
                'Pulling with arm instead of back.',
                'Not achieving full range of motion.'
            ],
            videoUrl: 'https://www.youtube.com/embed/roCP6wCXPqo'
        },
        // SHOULDERS
        {
            lift: 'Overhead Press',
            muscleGroup: 'Shoulders',
            image: overheadImg,
            breakdown: [
                '**Setup**: Bar at shoulder height, grip just outside shoulders. Feet shoulder-width, core tight.',
                '**Starting Position**: Elbows slightly in front of bar, forearms vertical.',
                '**Press**: Take a breath, brace. Press bar straight up, moving head back to clear the path.',
                '**Lockout**: Lock out overhead, shrug shoulders at top. Lower with control to shoulders.'
            ],
            keyPoints: [
                'Feet shoulder-width apart.',
                'Grip just outside shoulders.',
                'Elbows slightly in front of bar.',
                'Press straight up, moving head back to clear path.',
                'Lock out overhead with shrug.'
            ],
            mistakes: [
                'Arching lower back excessively.',
                'Using legs (push press).',
                'Pressing the bar forward instead of straight up.'
            ],
            videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI'
        },
        {
            lift: 'Lateral Raises',
            muscleGroup: 'Shoulders',
            image: null,
            breakdown: [
                '**Setup**: Stand with dumbbells at sides, slight bend in elbows.',
                '**Raise**: Lift dumbbells out to sides until arms are parallel to ground.',
                '**Top**: Pause briefly at top, maintaining elbow bend.',
                '**Lower**: Lower dumbbells with control back to sides.'
            ],
            keyPoints: [
                'Slight bend in elbows throughout.',
                'Raise to shoulder height.',
                'Lead with elbows, not hands.',
                'Control the descent.',
                'Don\'t use momentum.'
            ],
            mistakes: [
                'Swinging weights up.',
                'Raising too high (above shoulders).',
                'Shrugging shoulders.'
            ],
            videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo'
        },
        {
            lift: 'Face Pulls',
            muscleGroup: 'Shoulders',
            image: null,
            breakdown: [
                '**Setup**: Set cable at upper chest height. Attach rope, grip ends.',
                '**Pull**: Pull rope toward face, separating hands as you pull.',
                '**End Position**: Hands beside ears, elbows high and back.',
                '**Return**: Extend arms back to start with control.'
            ],
            keyPoints: [
                'Pull to face level.',
                'Separate hands at end.',
                'Keep elbows high.',
                'Squeeze shoulder blades.',
                'Focus on rear delts.'
            ],
            mistakes: [
                'Pulling too low.',
                'Not separating hands.',
                'Using too much weight.'
            ],
            videoUrl: 'https://www.youtube.com/embed/rep-qVOkqgk'
        },
        // ARMS
        {
            lift: 'Barbell Bicep Curl',
            muscleGroup: 'Arms',
            image: null,
            breakdown: [
                '**Setup**: Stand with feet shoulder-width, grip barbell with underhand grip.',
                '**Curl**: Curl bar up toward shoulders, keeping elbows stationary.',
                '**Top**: Squeeze biceps at top.',
                '**Lower**: Lower bar with control to starting position.'
            ],
            keyPoints: [
                'Keep elbows at sides.',
                'Don\'t swing or use momentum.',
                'Full range of motion.',
                'Squeeze at top.',
                'Control the negative.'
            ],
            mistakes: [
                'Swinging the weight.',
                'Moving elbows forward.',
                'Not fully extending arms.'
            ],
            videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
        },
        {
            lift: 'Hammer Curls',
            muscleGroup: 'Arms',
            image: null,
            breakdown: [
                '**Setup**: Stand with dumbbells at sides, palms facing each other (neutral grip).',
                '**Curl**: Curl dumbbells up, keeping palms facing each other throughout.',
                '**Top**: Squeeze at top.',
                '**Lower**: Lower with control to starting position.'
            ],
            keyPoints: [
                'Neutral grip throughout.',
                'Keep elbows stationary.',
                'Curl to shoulder level.',
                'Control the movement.',
                'Can alternate or do together.'
            ],
            mistakes: [
                'Rotating wrists.',
                'Using momentum.',
                'Incomplete range of motion.'
            ],
            videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4'
        },
        {
            lift: 'Tricep Pushdown',
            muscleGroup: 'Arms',
            image: null,
            breakdown: [
                '**Setup**: Stand at cable machine, grip bar or rope attachment.',
                '**Starting Position**: Elbows at sides, forearms parallel to ground.',
                '**Push**: Push down until arms are fully extended.',
                '**Return**: Let cable pull hands back up with control to starting position.'
            ],
            keyPoints: [
                'Keep elbows at sides.',
                'Full extension at bottom.',
                'Don\'t lean forward.',
                'Squeeze triceps at bottom.',
                'Control the return.'
            ],
            mistakes: [
                'Flaring elbows out.',
                'Leaning too far forward.',
                'Not fully extending.'
            ],
            videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU'
        },
        {
            lift: 'Skull Crushers',
            muscleGroup: 'Arms',
            image: null,
            breakdown: [
                '**Setup**: Lie on bench, hold barbell or EZ-bar above chest with arms extended.',
                '**Lower**: Lower bar toward forehead by bending elbows, keeping upper arms stationary.',
                '**Bottom**: Stop just above forehead.',
                '**Extend**: Extend arms back to starting position.'
            ],
            keyPoints: [
                'Keep upper arms stationary.',
                'Lower to forehead or just behind.',
                'Full extension at top.',
                'Control the weight.',
                'Use EZ-bar for wrist comfort.'
            ],
            mistakes: [
                'Moving upper arms.',
                'Going too heavy.',
                'Not controlling the descent.'
            ],
            videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM'
        },
        // CORE
        {
            lift: 'Plank',
            muscleGroup: 'Core',
            image: null,
            breakdown: [
                '**Setup**: Get into push-up position, then lower to forearms.',
                '**Position**: Body in straight line from head to heels, core engaged.',
                '**Hold**: Maintain position, breathing normally.',
                '**Duration**: Hold for 30-60 seconds or as long as form allows.'
            ],
            keyPoints: [
                'Body in straight line.',
                'Don\'t let hips sag.',
                'Engage core throughout.',
                'Breathe normally.',
                'Look at ground, not forward.'
            ],
            mistakes: [
                'Sagging hips.',
                'Raising hips too high.',
                'Holding breath.'
            ],
            videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c'
        },
        {
            lift: 'Russian Twist',
            muscleGroup: 'Core',
            image: null,
            breakdown: [
                '**Setup**: Sit on ground, lean back slightly, feet elevated or on ground.',
                '**Position**: Hold weight at chest, arms extended.',
                '**Twist**: Rotate torso to one side, bringing weight beside hip.',
                '**Alternate**: Rotate to other side. Continue alternating.'
            ],
            keyPoints: [
                'Lean back to engage core.',
                'Rotate from torso, not arms.',
                'Keep feet elevated for more difficulty.',
                'Control the movement.',
                'Breathe throughout.'
            ],
            mistakes: [
                'Moving too fast.',
                'Not rotating enough.',
                'Rounding back excessively.'
            ],
            videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI'
        },
        {
            lift: 'Hanging Leg Raise',
            muscleGroup: 'Core',
            image: null,
            breakdown: [
                '**Setup**: Hang from pull-up bar with arms fully extended.',
                '**Raise**: Raise legs up, keeping them straight or slightly bent.',
                '**Top**: Raise until thighs are parallel to ground or higher.',
                '**Lower**: Lower legs with control back to starting position.'
            ],
            keyPoints: [
                'Control the swing.',
                'Raise legs using abs, not momentum.',
                'Can bend knees for easier variation.',
                'Full range of motion.',
                'Don\'t swing.'
            ],
            mistakes: [
                'Using momentum/swinging.',
                'Not raising high enough.',
                'Dropping legs too fast.'
            ],
            videoUrl: 'https://www.youtube.com/embed/hdng3Nm1x_E'
        }
    ];

    const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

    // Filter exercises based on search and muscle group
    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.lift.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMuscleGroup = selectedMuscleGroup === 'All' || guide.muscleGroup === selectedMuscleGroup;
        return matchesSearch && matchesMuscleGroup;
    });

    // Get count for each muscle group
    const getMuscleGroupCount = (group) => {
        if (group === 'All') return guides.length;
        return guides.filter(g => g.muscleGroup === group).length;
    };

    return (
        <div style={{ display: 'grid', gap: '1.5rem', paddingBottom: '5rem' }}>


            {/* Search and Filter */}
            <div className="card">
                <input
                    type="text"
                    placeholder="🔍 Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        fontSize: '1rem',
                        marginBottom: '1rem'
                    }}
                />

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {muscleGroups.map(group => (
                        <button
                            key={group}
                            onClick={() => setSelectedMuscleGroup(group)}
                            className="btn"
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.875rem',
                                backgroundColor: selectedMuscleGroup === group ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                                color: selectedMuscleGroup === group ? 'var(--color-text-dark)' : 'var(--color-text)',
                                border: selectedMuscleGroup === group ? 'none' : '1px solid var(--color-border)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {group} ({getMuscleGroupCount(group)})
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            {(searchQuery || selectedMuscleGroup !== 'All') && (
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    Showing {filteredGuides.length} exercise{filteredGuides.length !== 1 ? 's' : ''}
                </div>
            )}

            {/* Exercise Cards */}
            {filteredGuides.map(guide => (
                <div key={guide.lift} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--color-border)',
                        paddingBottom: '0.75rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: 'var(--color-primary)' }}>
                                <LiftIcon lift={guide.lift} size={28} />
                            </span>
                            <h3 style={{ margin: 0 }}>{guide.lift}</h3>
                        </div>
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white'
                        }}>
                            {guide.muscleGroup}
                        </span>
                    </div>

                    {guide.image && (
                        <div style={{
                            backgroundColor: '#0f172a',
                            margin: '0 -1.5rem 1rem -1.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            borderBottom: '1px solid var(--color-border)'
                        }}>
                            <img
                                src={guide.image}
                                alt={`${guide.lift} form`}
                                style={{ maxHeight: '250px', width: 'auto', objectFit: 'contain' }}
                            />
                        </div>
                    )}

                    {guide.breakdown && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>📋 Movement Breakdown</h4>
                            <div style={{ fontSize: '0.875rem', lineHeight: '1.7' }}>
                                {guide.breakdown.map((step, i) => (
                                    <div key={i} style={{ marginBottom: '0.5rem' }}>
                                        {step.split('**').map((part, j) =>
                                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginBottom: '1.25rem' }}>
                        <h4 style={{ color: 'var(--color-success)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>✅ Key Points</h4>
                        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}>
                            {guide.keyPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <h4 style={{ color: 'var(--color-danger)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>❌ Common Mistakes</h4>
                        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                            {guide.mistakes.map((mistake, i) => (
                                <li key={i}>{mistake}</li>
                            ))}
                        </ul>
                    </div>

                    {guide.videoUrl && (
                        <div>
                            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>🎥 Video Tutorial</h4>
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%',
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: '#000'
                            }}>
                                <iframe
                                    src={guide.videoUrl}
                                    title={`${guide.lift} tutorial`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {filteredGuides.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</p>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        No exercises found. Try a different search or filter.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LearnPage;
