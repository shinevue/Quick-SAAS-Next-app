// Imports
import {
	fadeIn,
	initial,
	stagger,
	fadeInUp,
	initialTwo,
} from "@/animations/animations";
import Link from "next/link";
import Image from "next/image";
import {FC, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {ITailwindStyling} from "@/types/Dashboard/components";
import {dashboardMainMenuLinks} from "@/dashboard/content/menuLinks";

// Firebase
import {getAuth, signOut} from "firebase/auth";
import {useFirebaseContext} from "@/context/Firebase";

// Components
import NavbarLinks from "../components/Elements/NavbarLinks";

// Styling
import styles from "@/styles/pages/Dashboard.module.scss";

const MainNavigation: FC = () => {
	const auth = getAuth();
	const router = useRouter();
	const firebaseContext = useFirebaseContext();
	const [displayMenuText, setDisplayMenuText] = useState(false);

	// Handles User Logout
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("User Sign out Successful");
				router.push("/");
			})
			.catch((error) => {
				// An error happened.
			});
	};

	// Hides or Displays User Menu Text
	const handleRevealMenuText = () => {
		setDisplayMenuText(!displayMenuText);
	};

	// Nav conditional general styling
	const tailwindStyling: ITailwindStyling = {
		// User sign in styling
		ringStyling:
			"object-cover object-center w-[40px] h-[40px] rounded-full ring-4",

		// Nav styling
		UlStyling: "flex flex-col items-center gap-2 text-base font-medium",
		profileImageStyling:
			"flex flex-col items-center justify-center gap-4 mx-auto",
		revealMenuText: "w-[16px] h-[16px] text-white",
		mainLinksStyling:
			"flex flex-col items-center gap-4 text-sm px-2 py-3 text-white transition-all duration-200 ease-in-out rounded hover:text-white",
	};

	// Ensure userData is not null before using it in JSX
	if (!firebaseContext?.userData) {
		return <div>Loading...</div>; // or some other loading indicator
	}

	return (
		<>
			<nav
				className={
					displayMenuText
						? styles.mainNavigation + ` px-2 lg:w-24`
						: styles.mainNavigation + ` px-0 lg:w-fit`
				}
				style={{
					backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-blue-darkblue.svg")`,
				}}
			>
				<div className="flex flex-col justify-between h-full py-4">
					<div className="flex flex-col justify-between px-0">
						<motion.div
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className="w-auto px-3 py-3 mb-10"
						>
							<div
								className={
									displayMenuText
										? ` flex flex-wrap items-center`
										: ` flex flex-wrap items-center -my-2 mx-0`
								}
							>
								<div className={tailwindStyling.profileImageStyling}>
									<motion.div
										initial={initialTwo}
										viewport={{once: true}}
										whileInView={fadeIn}
										className={
											displayMenuText
												? "w-auto px-2 mx-auto"
												: "w-auto px-0 mx-0"
										}
									>
										<Image
											width={500}
											height={500}
											className={
												firebaseContext?.userData?.uid
													? tailwindStyling.ringStyling + ` ring-darkBlue`
													: tailwindStyling.ringStyling + ` ring-pinkRed`
											}
											src={
												firebaseContext?.userData?.photoURL
													? firebaseContext?.userData?.photoURL
													: `/img/Logos/default-avatar-profile.jpg`
											}
											alt={`${firebaseContext?.userData?.displayName} profile image`}
										/>
									</motion.div>
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className={
											displayMenuText
												? `block font-medium text-center text-white text-base`
												: `hidden`
										}
									>
										{firebaseContext?.userData?.displayName}
									</motion.h3>
								</div>
							</div>
						</motion.div>
						<div className="flex flex-col">
							<motion.ul
								initial={initial}
								whileInView={stagger}
								viewport={{once: true}}
								className={tailwindStyling.UlStyling}
							>
								<motion.li
									initial={initial}
									viewport={{once: true}}
									whileInView={fadeInUp}
									className={displayMenuText ? "w-full px-0" : "w-full px-2"}
								>
									<Link
										className={
											tailwindStyling.mainLinksStyling +
											` hover:bg-yellowDash hover:text-white`
										}
										href={`/dashboard`}
									>
										<motion.span
											initial={initialTwo}
											whileInView={fadeIn}
											viewport={{once: true}}
											className={
												displayMenuText
													? `flex items-center`
													: `flex items-center`
											}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												width="1080"
												height="1080"
												viewBox="0 0 1080 1080"
												className="w-[20px] h-[20px] text-white"
											>
												<g transform="matrix(60 0 0 60 540 540)">
													<path
														style={{
															stroke: "none",
															strokeWidth: "1",
															strokeDasharray: "none",
															strokeLinecap: "butt",
															strokeDashoffset: "0",
															strokeLinejoin: "miter",
															strokeMiterlimit: "4",
															fill: "rgb(255,255,255)",
															fillRule: "nonzero",
															opacity: "1",
														}}
														transform=" translate(-9, -9)"
														d="M 7.33329 9.83329 L 1.49996 9.83329 C 1.27895 9.83329 1.06698 9.92109 0.910704 10.0774 C 0.754423 10.2337 0.666626 10.4456 0.666626 10.6666 L 0.666626 16.5 C 0.666626 16.721 0.754423 16.9329 0.910704 17.0892 C 1.06698 17.2455 1.27895 17.3333 1.49996 17.3333 L 7.33329 17.3333 C 7.55431 17.3333 7.76627 17.2455 7.92255 17.0892 C 8.07883 16.9329 8.16663 16.721 8.16663 16.5 L 8.16663 10.6666 C 8.16663 10.4456 8.07883 10.2337 7.92255 10.0774 C 7.76627 9.92109 7.55431 9.83329 7.33329 9.83329 Z M 6.49996 15.6666 L 2.33329 15.6666 L 2.33329 11.5 L 6.49996 11.5 L 6.49996 15.6666 Z M 16.5 0.666626 L 10.6666 0.666626 C 10.4456 0.666626 10.2337 0.754423 10.0774 0.910704 C 9.92109 1.06698 9.83329 1.27895 9.83329 1.49996 L 9.83329 7.33329 C 9.83329 7.55431 9.92109 7.76627 10.0774 7.92255 C 10.2337 8.07883 10.4456 8.16663 10.6666 8.16663 L 16.5 8.16663 C 16.721 8.16663 16.9329 8.07883 17.0892 7.92255 C 17.2455 7.76627 17.3333 7.55431 17.3333 7.33329 L 17.3333 1.49996 C 17.3333 1.27895 17.2455 1.06698 17.0892 0.910704 C 16.9329 0.754423 16.721 0.666626 16.5 0.666626 Z M 15.6666 6.49996 L 11.5 6.49996 L 11.5 2.33329 L 15.6666 2.33329 L 15.6666 6.49996 Z M 16.5 9.83329 L 10.6666 9.83329 C 10.4456 9.83329 10.2337 9.92109 10.0774 10.0774 C 9.92109 10.2337 9.83329 10.4456 9.83329 10.6666 L 9.83329 16.5 C 9.83329 16.721 9.92109 16.9329 10.0774 17.0892 C 10.2337 17.2455 10.4456 17.3333 10.6666 17.3333 L 16.5 17.3333 C 16.721 17.3333 16.9329 17.2455 17.0892 17.0892 C 17.2455 16.9329 17.3333 16.721 17.3333 16.5 L 17.3333 10.6666 C 17.3333 10.4456 17.2455 10.2337 17.0892 10.0774 C 16.9329 9.92109 16.721 9.83329 16.5 9.83329 Z M 15.6666 15.6666 L 11.5 15.6666 L 11.5 11.5 L 15.6666 11.5 L 15.6666 15.6666 Z M 7.33329 0.666626 L 1.49996 0.666626 C 1.27895 0.666626 1.06698 0.754423 0.910704 0.910704 C 0.754423 1.06698 0.666626 1.27895 0.666626 1.49996 L 0.666626 7.33329 C 0.666626 7.55431 0.754423 7.76627 0.910704 7.92255 C 1.06698 8.07883 1.27895 8.16663 1.49996 8.16663 L 7.33329 8.16663 C 7.55431 8.16663 7.76627 8.07883 7.92255 7.92255 C 8.07883 7.76627 8.16663 7.55431 8.16663 7.33329 L 8.16663 1.49996 C 8.16663 1.27895 8.07883 1.06698 7.92255 0.910704 C 7.76627 0.754423 7.55431 0.666626 7.33329 0.666626 Z M 6.49996 6.49996 L 2.33329 6.49996 L 2.33329 2.33329 L 6.49996 2.33329 L 6.49996 6.49996 Z"
														strokeLinecap="round"
														fill="#ffffff"
													/>
												</g>
											</svg>
										</motion.span>
										<motion.span
											initial={initialTwo}
											whileInView={fadeIn}
											viewport={{once: true}}
											className={displayMenuText ? `block` : `hidden`}
										>
											Dashboard
										</motion.span>
									</Link>
								</motion.li>

								{dashboardMainMenuLinks?.length > 0 ? (
									dashboardMainMenuLinks?.map((item, keys) => (
										<motion.li
											key={item?.id}
											initial={initial}
											whileInView={fadeInUp}
											viewport={{once: true}}
											className="w-full px-0"
										>
											<NavbarLinks
												path={item?.path}
												label={item?.name}
												displayMenuText={displayMenuText}
												tailwindStyling={
													displayMenuText
														? tailwindStyling.mainLinksStyling +
														  ` hover:bg-darkBlue`
														: tailwindStyling.mainLinksStyling +
														  ` hover:opacity-60`
												}
											/>
										</motion.li>
									))
								) : (
									<></>
								)}
							</motion.ul>
						</div>
					</div>
					<motion.div
						initial={initial}
						whileInView={stagger}
						viewport={{once: true}}
						className={tailwindStyling.UlStyling}
					>
						<motion.div
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className="w-full"
						>
							<Link
								className={
									displayMenuText
										? tailwindStyling.mainLinksStyling + ` hover:bg-darkBlue`
										: tailwindStyling.mainLinksStyling + ` hover:opacity-60`
								}
								href={`/contact/#contactForm`}
							>
								<span
									className={displayMenuText ? `inline-block` : `inline-block`}
								>
									<svg
										width="20"
										height="20"
										fill="none"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										className="w-[20px] h-[20px] text-white"
									>
										<path
											d="M12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6ZM7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13V17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17V13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12ZM17 10C16.7348 10 16.4804 10.1054 16.2929 10.2929C16.1054 10.4804 16 10.7348 16 11V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V11C18 10.7348 17.8946 10.4804 17.7071 10.2929C17.5196 10.1054 17.2652 10 17 10ZM19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19Z"
											fill="currentColor"
										></path>
									</svg>
								</span>
								<span
									className={displayMenuText ? `block text-center` : `hidden`}
								>
									Give feedback
								</span>
							</Link>
						</motion.div>
						<motion.div
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className="w-full"
						>
							<Link
								className={
									displayMenuText
										? tailwindStyling.mainLinksStyling + ` hover:bg-darkBlue`
										: tailwindStyling.mainLinksStyling + ` hover:opacity-60`
								}
								href={`/dashboard/settings`}
							>
								<span
									className={displayMenuText ? `inline-block` : `inline-block`}
								>
									<svg
										width="20"
										height="20"
										fill="none"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										className="w-[20px] h-[20px] text-white"
									>
										<path
											d="M17.7666 7.9583L16.1916 7.4333L16.9333 5.94996C17.0085 5.7947 17.0336 5.61993 17.0053 5.44977C16.9769 5.27961 16.8964 5.12245 16.775 4.99996L15 3.22496C14.8768 3.1017 14.7182 3.02013 14.5463 2.99173C14.3743 2.96333 14.1979 2.98953 14.0416 3.06663L12.5583 3.8083L12.0333 2.2333C11.9778 2.06912 11.8726 1.92632 11.7322 1.82475C11.5918 1.72319 11.4232 1.66792 11.25 1.66663H8.74996C8.57526 1.66618 8.40483 1.72064 8.26277 1.82233C8.12071 1.92402 8.0142 2.06778 7.9583 2.2333L7.4333 3.8083L5.94996 3.06663C5.7947 2.99145 5.61993 2.9663 5.44977 2.99466C5.27961 3.02302 5.12245 3.10349 4.99996 3.22496L3.22496 4.99996C3.1017 5.1231 3.02013 5.28177 2.99173 5.45368C2.96333 5.62558 2.98953 5.80205 3.06663 5.9583L3.8083 7.44163L2.2333 7.96663C2.06912 8.02208 1.92632 8.12732 1.82475 8.26772C1.72319 8.40812 1.66792 8.57668 1.66663 8.74996V11.25C1.66618 11.4247 1.72064 11.5951 1.82233 11.7372C1.92402 11.8792 2.06778 11.9857 2.2333 12.0416L3.8083 12.5666L3.06663 14.05C2.99145 14.2052 2.9663 14.38 2.99466 14.5502C3.02302 14.7203 3.10349 14.8775 3.22496 15L4.99996 16.775C5.1231 16.8982 5.28177 16.9798 5.45368 17.0082C5.62558 17.0366 5.80205 17.0104 5.9583 16.9333L7.44163 16.1916L7.96663 17.7666C8.02253 17.9321 8.12904 18.0759 8.2711 18.1776C8.41317 18.2793 8.58359 18.3337 8.7583 18.3333H11.2583C11.433 18.3337 11.6034 18.2793 11.7455 18.1776C11.8875 18.0759 11.9941 17.9321 12.05 17.7666L12.575 16.1916L14.0583 16.9333C14.2126 17.0066 14.3856 17.0307 14.5541 17.0024C14.7225 16.9741 14.8781 16.8947 15 16.775L16.775 15C16.8982 14.8768 16.9798 14.7182 17.0082 14.5463C17.0366 14.3743 17.0104 14.1979 16.9333 14.0416L16.1916 12.5583L17.7666 12.0333C17.9308 11.9778 18.0736 11.8726 18.1752 11.7322C18.2767 11.5918 18.332 11.4232 18.3333 11.25V8.74996C18.3337 8.57526 18.2793 8.40483 18.1776 8.26277C18.0759 8.12071 17.9321 8.0142 17.7666 7.9583ZM16.6666 10.65L15.6666 10.9833C15.4367 11.0579 15.2257 11.1816 15.0483 11.3459C14.871 11.5102 14.7315 11.711 14.6395 11.9346C14.5475 12.1582 14.5053 12.3991 14.5158 12.6406C14.5262 12.8821 14.5891 13.1185 14.7 13.3333L15.175 14.2833L14.2583 15.2L13.3333 14.7C13.1196 14.5935 12.8855 14.5342 12.6469 14.526C12.4083 14.5179 12.1707 14.5611 11.9502 14.6528C11.7298 14.7445 11.5316 14.8824 11.3691 15.0573C11.2066 15.2322 11.0835 15.44 11.0083 15.6666L10.675 16.6666H9.34996L9.01663 15.6666C8.94204 15.4367 8.81832 15.2257 8.65404 15.0483C8.48977 14.871 8.28888 14.7315 8.06531 14.6395C7.84174 14.5475 7.60084 14.5053 7.35932 14.5158C7.11779 14.5262 6.88143 14.5891 6.66663 14.7L5.71663 15.175L4.79996 14.2583L5.29996 13.3333C5.41087 13.1185 5.47373 12.8821 5.48417 12.6406C5.49461 12.3991 5.45238 12.1582 5.36041 11.9346C5.26845 11.711 5.12894 11.5102 4.95158 11.3459C4.77422 11.1816 4.56325 11.0579 4.3333 10.9833L3.3333 10.65V9.34996L4.3333 9.01663C4.56325 8.94204 4.77422 8.81832 4.95158 8.65404C5.12894 8.48977 5.26845 8.28888 5.36041 8.06531C5.45238 7.84174 5.49461 7.60084 5.48417 7.35932C5.47373 7.11779 5.41087 6.88143 5.29996 6.66663L4.82496 5.74163L5.74163 4.82496L6.66663 5.29996C6.88143 5.41087 7.11779 5.47373 7.35932 5.48417C7.60084 5.49461 7.84174 5.45238 8.06531 5.36041C8.28888 5.26845 8.48977 5.12894 8.65404 4.95158C8.81832 4.77422 8.94204 4.56325 9.01663 4.3333L9.34996 3.3333H10.65L10.9833 4.3333C11.0579 4.56325 11.1816 4.77422 11.3459 4.95158C11.5102 5.12894 11.711 5.26845 11.9346 5.36041C12.1582 5.45238 12.3991 5.49461 12.6406 5.48417C12.8821 5.47373 13.1185 5.41087 13.3333 5.29996L14.2833 4.82496L15.2 5.74163L14.7 6.66663C14.5935 6.88033 14.5342 7.11442 14.526 7.35304C14.5179 7.59165 14.5611 7.82924 14.6528 8.0497C14.7445 8.27016 14.8824 8.46835 15.0573 8.63086C15.2322 8.79337 15.44 8.9164 15.6666 8.99163L16.6666 9.32496V10.65ZM9.99996 6.66663C9.34069 6.66663 8.69623 6.86213 8.14806 7.2284C7.5999 7.59467 7.17266 8.11526 6.92036 8.72435C6.66807 9.33344 6.60206 10.0037 6.73068 10.6503C6.8593 11.2969 7.17676 11.8908 7.64294 12.357C8.10911 12.8232 8.70306 13.1406 9.34966 13.2692C9.99626 13.3979 10.6665 13.3319 11.2756 13.0796C11.8847 12.8273 12.4053 12.4 12.7715 11.8519C13.1378 11.3037 13.3333 10.6592 13.3333 9.99996C13.3333 9.11591 12.9821 8.26806 12.357 7.64294C11.7319 7.01782 10.884 6.66663 9.99996 6.66663ZM9.99996 11.6666C9.67033 11.6666 9.34809 11.5689 9.07401 11.3857C8.79993 11.2026 8.58631 10.9423 8.46016 10.6378C8.33402 10.3332 8.30101 9.99811 8.36532 9.67481C8.42963 9.35151 8.58836 9.05454 8.82145 8.82145C9.05454 8.58836 9.35151 8.42963 9.67481 8.36532C9.99811 8.30101 10.3332 8.33402 10.6378 8.46016C10.9423 8.58631 11.2026 8.79993 11.3857 9.07401C11.5689 9.34809 11.6666 9.67033 11.6666 9.99996C11.6666 10.442 11.491 10.8659 11.1785 11.1785C10.8659 11.491 10.442 11.6666 9.99996 11.6666Z"
											fill="currentColor"
										></path>
									</svg>
								</span>
								<span className={displayMenuText ? `block` : `hidden`}>
									Settings
								</span>
							</Link>
						</motion.div>
						<motion.button
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							onClick={handleRevealMenuText}
							className="flex items-center px-4 py-3 mx-auto text-base text-white transition-all duration-200 ease-in-out rounded w-fit hover:opacity-60"
						>
							<span className="inline-block">
								<svg
									className={
										displayMenuText
											? tailwindStyling.revealMenuText + " rotate-180"
											: tailwindStyling.revealMenuText
									}
									width="18"
									height="18"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.59 11L8.29 13.29C8.19627 13.383 8.12188 13.4936 8.07111 13.6154C8.02034 13.7373 7.9942 13.868 7.9942 14C7.9942 14.132 8.02034 14.2627 8.07111 14.3846C8.12188 14.5064 8.19627 14.617 8.29 14.71C8.38296 14.8037 8.49356 14.8781 8.61542 14.9289C8.73728 14.9797 8.86799 15.0058 9 15.0058C9.13201 15.0058 9.26272 14.9797 9.38458 14.9289C9.50644 14.8781 9.61704 14.8037 9.71 14.71L13.71 10.71C13.801 10.6149 13.8724 10.5028 13.92 10.38C14.02 10.1365 14.02 9.86347 13.92 9.62001C13.8724 9.49726 13.801 9.38511 13.71 9.29001L9.71 5.29001C9.61676 5.19677 9.50607 5.12281 9.38425 5.07235C9.26243 5.02189 9.13186 4.99592 9 4.99592C8.86814 4.99592 8.73757 5.02189 8.61575 5.07235C8.49393 5.12281 8.38324 5.19677 8.29 5.29001C8.19676 5.38325 8.1228 5.49394 8.07234 5.61576C8.02188 5.73758 7.99591 5.86815 7.99591 6.00001C7.99591 6.13187 8.02188 6.26244 8.07234 6.38426C8.1228 6.50608 8.19676 6.61677 8.29 6.71001L10.59 9.00001H1C0.734784 9.00001 0.48043 9.10537 0.292893 9.2929C0.105357 9.48044 0 9.73479 0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8947 0.734784 11 1 11H10.59ZM10 8.14093e-06C8.13109 -0.00833565 6.29724 0.507221 4.70647 1.4882C3.11569 2.46918 1.83165 3.87632 1 5.55001C0.880653 5.7887 0.861015 6.06503 0.945406 6.31821C1.0298 6.57138 1.21131 6.78066 1.45 6.90001C1.68869 7.01936 1.96502 7.03899 2.2182 6.9546C2.47137 6.87021 2.68065 6.6887 2.8 6.45001C3.43219 5.17333 4.39383 4.08863 5.58555 3.308C6.77727 2.52736 8.15582 2.07913 9.57876 2.0096C11.0017 1.94007 12.4174 2.25178 13.6795 2.91252C14.9417 3.57325 16.0045 4.55904 16.7581 5.768C17.5118 6.97697 17.9289 8.36526 17.9664 9.78939C18.0039 11.2135 17.6605 12.6219 16.9715 13.8688C16.2826 15.1158 15.2731 16.1562 14.0475 16.8824C12.8219 17.6087 11.4246 17.9945 10 18C8.50888 18.0065 7.04615 17.5924 5.77969 16.8053C4.51323 16.0181 3.49435 14.8899 2.84 13.55C2.72065 13.3113 2.51137 13.1298 2.2582 13.0454C2.00502 12.961 1.72869 12.9807 1.49 13.1C1.25131 13.2194 1.0698 13.4286 0.985406 13.6818C0.901015 13.935 0.920653 14.2113 1.04 14.45C1.83283 16.0455 3.03752 17.4002 4.52947 18.3741C6.02142 19.3479 7.74645 19.9054 9.52612 19.989C11.3058 20.0726 13.0755 19.6792 14.6521 18.8495C16.2288 18.0198 17.5552 16.784 18.4941 15.2698C19.433 13.7557 19.9503 12.0181 19.9925 10.237C20.0347 8.45588 19.6003 6.6958 18.7342 5.13884C17.8682 3.58188 16.6018 2.28457 15.0663 1.38111C13.5307 0.477653 11.7816 0.000844593 10 8.14093e-06Z"
										fill="#e8b042"
									></path>
								</svg>
							</span>
						</motion.button>
						<motion.button
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							onClick={handleLogout}
							className="flex items-center px-4 py-3 mx-auto text-base text-white transition-all duration-200 ease-in-out rounded w-fit hover:opacity-60"
						>
							<span className="inline-block">
								<svg
									className="w-[20px] h-[20px] text-white"
									width="20"
									height="20"
									viewBox="0 0 14 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.333618 8.99996C0.333618 9.22097 0.421416 9.43293 0.577696 9.58922C0.733976 9.7455 0.945938 9.83329 1.16695 9.83329H7.49195L5.57528 11.7416C5.49718 11.8191 5.43518 11.9113 5.39287 12.0128C5.35057 12.1144 5.32879 12.2233 5.32879 12.3333C5.32879 12.4433 5.35057 12.5522 5.39287 12.6538C5.43518 12.7553 5.49718 12.8475 5.57528 12.925C5.65275 13.0031 5.74492 13.0651 5.84647 13.1074C5.94802 13.1497 6.05694 13.1715 6.16695 13.1715C6.27696 13.1715 6.38588 13.1497 6.48743 13.1074C6.58898 13.0651 6.68115 13.0031 6.75862 12.925L10.0919 9.59163C10.1678 9.51237 10.2273 9.41892 10.2669 9.31663C10.3503 9.11374 10.3503 8.88618 10.2669 8.68329C10.2273 8.581 10.1678 8.48755 10.0919 8.40829L6.75862 5.07496C6.68092 4.99726 6.58868 4.93563 6.48716 4.89358C6.38564 4.85153 6.27683 4.82988 6.16695 4.82988C6.05707 4.82988 5.94826 4.85153 5.84674 4.89358C5.74522 4.93563 5.65298 4.99726 5.57528 5.07496C5.49759 5.15266 5.43595 5.2449 5.3939 5.34642C5.35185 5.44794 5.33021 5.55674 5.33021 5.66663C5.33021 5.77651 5.35185 5.88532 5.3939 5.98683C5.43595 6.08835 5.49759 6.18059 5.57528 6.25829L7.49195 8.16663H1.16695C0.945938 8.16663 0.733976 8.25442 0.577696 8.4107C0.421416 8.56698 0.333618 8.77895 0.333618 8.99996ZM11.1669 0.666626H2.83362C2.17058 0.666626 1.53469 0.930018 1.06585 1.39886C0.59701 1.8677 0.333618 2.50358 0.333618 3.16663V5.66663C0.333618 5.88764 0.421416 6.0996 0.577696 6.25588C0.733976 6.41216 0.945938 6.49996 1.16695 6.49996C1.38797 6.49996 1.59993 6.41216 1.75621 6.25588C1.91249 6.0996 2.00028 5.88764 2.00028 5.66663V3.16663C2.00028 2.94561 2.08808 2.73365 2.24436 2.57737C2.40064 2.42109 2.6126 2.33329 2.83362 2.33329H11.1669C11.388 2.33329 11.5999 2.42109 11.7562 2.57737C11.9125 2.73365 12.0003 2.94561 12.0003 3.16663V14.8333C12.0003 15.0543 11.9125 15.2663 11.7562 15.4225C11.5999 15.5788 11.388 15.6666 11.1669 15.6666H2.83362C2.6126 15.6666 2.40064 15.5788 2.24436 15.4225C2.08808 15.2663 2.00028 15.0543 2.00028 14.8333V12.3333C2.00028 12.1123 1.91249 11.9003 1.75621 11.744C1.59993 11.5878 1.38797 11.5 1.16695 11.5C0.945938 11.5 0.733976 11.5878 0.577696 11.744C0.421416 11.9003 0.333618 12.1123 0.333618 12.3333V14.8333C0.333618 15.4963 0.59701 16.1322 1.06585 16.6011C1.53469 17.0699 2.17058 17.3333 2.83362 17.3333H11.1669C11.83 17.3333 12.4659 17.0699 12.9347 16.6011C13.4036 16.1322 13.6669 15.4963 13.6669 14.8333V3.16663C13.6669 2.50358 13.4036 1.8677 12.9347 1.39886C12.4659 0.930018 11.83 0.666626 11.1669 0.666626Z"
										fill="#f31243"
									></path>
								</svg>
							</span>
						</motion.button>
					</motion.div>
				</div>
			</nav>
		</>
	);
};

export default MainNavigation;
