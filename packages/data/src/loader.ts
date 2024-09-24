import { CourseKeys } from './index';
const _courses = {
    'special-topics-applied-natural-language-processing': async () =>
        (
            await import(
                './courses/special-topics-applied-natural-language-processing'
            )
        ).default,
    'special-topics-quantum-computing': async () =>
        (await import('./courses/special-topics-quantum-computing')).default,
    'seminar-computational-sociology-seminar': async () =>
        (await import('./courses/seminar-computational-sociology-seminar'))
            .default,
    'special-topics-digital-public-policy': async () =>
        (await import('./courses/special-topics-digital-public-policy'))
            .default,
    'natural-language-processing': async () =>
        (await import('./courses/natural-language-processing')).default,
    'seminar-cs-educators-seminar': async () =>
        (await import('./courses/seminar-cs-educators-seminar')).default,
    'cyber-physical-security-in-electric-energy-systems': async () =>
        (
            await import(
                './courses/cyber-physical-security-in-electric-energy-systems'
            )
        ).default,
    'seminar-women-in-tech-seminar': async () =>
        (await import('./courses/seminar-women-in-tech-seminar')).default,
    'seminar-computing-in-python-seminar': async () =>
        (await import('./courses/seminar-computing-in-python-seminar')).default,
    'special-topics-introduction-to-computer-law': async () =>
        (await import('./courses/special-topics-introduction-to-computer-law'))
            .default,
    'special-topics-geopolitics-of-cybersecurity': async () =>
        (await import('./courses/special-topics-geopolitics-of-cybersecurity'))
            .default,
    'special-topics-global-entrepreneurship': async () =>
        (await import('./courses/special-topics-global-entrepreneurship'))
            .default,
    'introduction-to-information-security': async () =>
        (await import('./courses/introduction-to-information-security'))
            .default,
    'computing-for-good': async () =>
        (await import('./courses/computing-for-good')).default,
    'graduate-introduction-to-operating-systems': async () =>
        (await import('./courses/graduate-introduction-to-operating-systems'))
            .default,
    'advanced-operating-systems': async () =>
        (await import('./courses/advanced-operating-systems')).default,
    'secure-computer-systems': async () =>
        (await import('./courses/secure-computer-systems')).default,
    'computer-networks': async () =>
        (await import('./courses/computer-networks')).default,
    'applied-cryptography': async () =>
        (await import('./courses/applied-cryptography')).default,
    'network-security': async () =>
        (await import('./courses/network-security')).default,
    'introduction-to-cyber-physical-systems-security': async () =>
        (
            await import(
                './courses/introduction-to-cyber-physical-systems-security'
            )
        ).default,
    'information-security-lab-system-and-network-defenses': async () =>
        (
            await import(
                './courses/information-security-lab-system-and-network-defenses'
            )
        ).default,
    'information-security-lab-binary-exploitation': async () =>
        (await import('./courses/information-security-lab-binary-exploitation'))
            .default,
    'high-performance-computer-architecture': async () =>
        (await import('./courses/high-performance-computer-architecture'))
            .default,
    'embedded-systems-optimization': async () =>
        (await import('./courses/embedded-systems-optimization')).default,
    'software-development-process': async () =>
        (await import('./courses/software-development-process')).default,
    'software-architecture-and-design': async () =>
        (await import('./courses/software-architecture-and-design')).default,
    'advanced-topics-in-software-analysis-and-testing': async () =>
        (
            await import(
                './courses/advanced-topics-in-software-analysis-and-testing'
            )
        ).default,
    'database-systems-concepts-and-design': async () =>
        (await import('./courses/database-systems-concepts-and-design'))
            .default,
    'introduction-to-health-informatics': async () =>
        (await import('./courses/introduction-to-health-informatics')).default,
    'video-game-design-and-programming': async () =>
        (await import('./courses/video-game-design-and-programming')).default,
    'educational-technology-conceptual-foundations': async () =>
        (
            await import(
                './courses/educational-technology-conceptual-foundations'
            )
        ).default,
    'computational-journalism': async () =>
        (await import('./courses/computational-journalism')).default,
    'computational-photography': async () =>
        (await import('./courses/computational-photography')).default,
    'introduction-to-computer-vision': async () =>
        (await import('./courses/introduction-to-computer-vision')).default,
    'introduction-to-graduate-algorithms': async () =>
        (await import('./courses/introduction-to-graduate-algorithms')).default,
    'artificial-intelligence': async () =>
        (await import('./courses/artificial-intelligence')).default,
    'ai-ethics-and-society': async () =>
        (await import('./courses/ai-ethics-and-society')).default,
    'advanced-internet-computing-systems-and-applications': async () =>
        (
            await import(
                './courses/advanced-internet-computing-systems-and-applications'
            )
        ).default,
    'cyber-security-practicum': async () =>
        (await import('./courses/cyber-security-practicum')).default,
    'advanced-topics-in-malware-analysis': async () =>
        (await import('./courses/advanced-topics-in-malware-analysis')).default,
    'human-computer-interaction': async () =>
        (await import('./courses/human-computer-interaction')).default,
    'introduction-to-cognitive-science': async () =>
        (await import('./courses/introduction-to-cognitive-science')).default,
    'distributed-computing': async () =>
        (await import('./courses/distributed-computing')).default,
    'network-science-methods-and-applications': async () =>
        (await import('./courses/network-science-methods-and-applications'))
            .default,
    'mobile-and-ubiquitous-computing': async () =>
        (await import('./courses/mobile-and-ubiquitous-computing')).default,
    'game-artificial-intelligence': async () =>
        (await import('./courses/game-artificial-intelligence')).default,
    'knowledge-based-ai': async () =>
        (await import('./courses/knowledge-based-ai')).default,
    'artificial-intelligence-techniques-for-robotics': async () =>
        (
            await import(
                './courses/artificial-intelligence-techniques-for-robotics'
            )
        ).default,
    'cyber-physical-design-and-analysis': async () =>
        (await import('./courses/cyber-physical-design-and-analysis')).default,
    'machine-learning': async () =>
        (await import('./courses/machine-learning')).default,
    'reinforcement-learning-and-decision-making': async () =>
        (await import('./courses/reinforcement-learning-and-decision-making'))
            .default,
    'deep-learning': async () =>
        (await import('./courses/deep-learning')).default,
    'machine-learning-for-trading': async () =>
        (await import('./courses/machine-learning-for-trading')).default,
    'special-topics-compilers-theory-and-practice': async () =>
        (await import('./courses/special-topics-compilers-theory-and-practice'))
            .default,
    'special-topics-systems-issues-in-cloud-computing': async () =>
        (
            await import(
                './courses/special-topics-systems-issues-in-cloud-computing'
            )
        ).default,
    'security-operations-and-incidence-response': async () =>
        (await import('./courses/security-operations-and-incidence-response'))
            .default,
    'computing-for-data-analysis-methods-and-tools': async () =>
        (
            await import(
                './courses/computing-for-data-analysis-methods-and-tools'
            )
        ).default,
    'high-performance-computing': async () =>
        (await import('./courses/high-performance-computing')).default,
    'data-and-visual-analytics': async () =>
        (await import('./courses/data-and-visual-analytics')).default,
    'big-data-analytics-for-healthcare': async () =>
        (await import('./courses/big-data-analytics-for-healthcare')).default,
    'modeling-simulation-and-military-gaming': async () =>
        (await import('./courses/modeling-simulation-and-military-gaming'))
            .default,
    'introduction-to-cyber-physical-electric-energy-systems': async () =>
        (
            await import(
                './courses/introduction-to-cyber-physical-electric-energy-systems'
            )
        ).default,
    'side-channels-and-their-role-in-cybersecurity': async () =>
        (
            await import(
                './courses/side-channels-and-their-role-in-cybersecurity'
            )
        ).default,
    'international-security': async () =>
        (await import('./courses/international-security')).default,
    'data-analytics-and-security': async () =>
        (await import('./courses/data-analytics-and-security')).default,
    'time-series-analysis': async () =>
        (await import('./courses/time-series-analysis')).default,
    'statistical-modeling-and-regression-analysis': async () =>
        (await import('./courses/statistical-modeling-and-regression-analysis'))
            .default,
    'computational-statistics': async () =>
        (await import('./courses/computational-statistics')).default,
    'introduction-to-theory-and-practice-of-bayesian-statistics': async () =>
        (
            await import(
                './courses/introduction-to-theory-and-practice-of-bayesian-statistics'
            )
        ).default,
    'introduction-to-analytics-modeling': async () =>
        (await import('./courses/introduction-to-analytics-modeling')).default,
    simulation: async () => (await import('./courses/simulation')).default,
    'probabilistic-models-and-their-applications': async () =>
        (await import('./courses/probabilistic-models-and-their-applications'))
            .default,
    'deterministic-optimization': async () =>
        (await import('./courses/deterministic-optimization')).default,
    'computational-data-analysis-learning-mining-and-computation': async () =>
        (
            await import(
                './courses/computational-data-analysis-learning-mining-and-computation'
            )
        ).default,
    'data-mining-and-statistical-learning': async () =>
        (await import('./courses/data-mining-and-statistical-learning'))
            .default,
    'special-topics-high-dimensional-data-analytics': async () =>
        (
            await import(
                './courses/special-topics-high-dimensional-data-analytics'
            )
        ).default,
    'data-analytics-in-business': async () =>
        (await import('./courses/data-analytics-in-business')).default,
    'digital-marketing': async () =>
        (await import('./courses/digital-marketing')).default,
    'privacy-for-professionals': async () =>
        (await import('./courses/privacy-for-professionals')).default,
    'applied-analytics-practicum': async () =>
        (await import('./courses/applied-analytics-practicum')).default,
    'special-topics-business-fundamentals-for-analytics': async () =>
        (
            await import(
                './courses/special-topics-business-fundamentals-for-analytics'
            )
        ).default,
    'special-topics-financial-modeling': async () =>
        (await import('./courses/special-topics-financial-modeling')).default,
    'special-topics-data-analysis-for-continuous-improvement': async () =>
        (
            await import(
                './courses/special-topics-data-analysis-for-continuous-improvement'
            )
        ).default,
    'internet-and-public-policy': async () =>
        (await import('./courses/internet-and-public-policy')).default,
    'information-policy-and-management': async () =>
        (await import('./courses/information-policy-and-management')).default,
    'information-and-communications-technology-policy': async () =>
        (
            await import(
                './courses/information-and-communications-technology-policy'
            )
        ).default,
    'information-security-policies-and-strategies': async () =>
        (await import('./courses/information-security-policies-and-strategies'))
            .default,
};

type CourseType<T extends CourseKeys> = Awaited<
    ReturnType<(typeof _courses)[T]>
>;

const getCourse = async <T extends CourseKeys>(
    courseName: T,
): Promise<CourseType<T>> => {
    const t = (await _courses[courseName]()) as CourseType<T>;
    return t;
};
export default getCourse;
