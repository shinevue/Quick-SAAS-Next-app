// Imports
import {
	getNavbarMenuLinks,
	getFooterMenuLinks,
	getIndustriesMenuLinks,
} from "@/functions/GetAllMenuLinks";
import {motion} from "framer-motion";
import {ContentContext} from "@/context/context";
import type {GetStaticProps, NextPage} from "next";

// Components
import SignUp from "@/components/SignUp";
import LayoutTwo from "@/components/Layout/LayoutTwo";

import {getThemesOptionsContent} from "@/functions/GetAllThemesOptions";

interface ISignUpPage {
	seo: {
		canonical: string;
		cornerstone: Boolean;
		focuskw: string;
		fullHead: string;
		metaDesc: string;
		metaKeywords: string;
		metaRobotsNofollow: string;
		metaRobotsNoindex: string;
		opengraphAuthor: string;
		opengraphDescription: string;
		opengraphImage: {
			mediaItemUrl: string;
		};
		opengraphModifiedTime: string;
		opengraphPublishedTime: string;
		opengraphPublisher: string;
		opengraphSiteName: string;
		opengraphTitle: string;
		opengraphType: string;
		opengraphUrl: string;
		readingTime: number;
		title: string;
		twitterDescription: string;
		twitterTitle: string;
		twitterImage: {
			mediaItemUrl: string;
		};
	};
	content: any;
	stripePlans: {
		stripePrices:
			| [
					{
						id: string;
						object: string;
						active: boolean;
						billing_scheme: string;
						created: number;
						currency: string;
						custom_unit_amount: any;
						livemode: boolean;
						lookup_key: any;
						metadata: any;
						nickname: any;
						product: {
							id: string;
							object: string;
							active: boolean;
							attributes: [];
							created: number;
							default_price: string;
							description: string;
							images: [any];
							livemode: boolean;
							metadata: any;
							name: string;
							package_dimensions: any;
							shippable: any;
							statement_descriptor: any;
							tax_code: any;
							type: string;
							unit_label: any;
							updated: number;
							url: any;
						};
						recurring: {
							aggregate_usage: any;
							interval: string;
							interval_count: number;
							trial_period_days: any;
							usage_type: string;
						};
						tax_behavior: string;
						tiers_mode: any;
						transform_quantity: any;
						type: string;
						unit_amount: number;
						unit_amount_decimal: string;
					}
			  ];
		stripePremiumPlan: {
			name: string;
			description: string;
			price: number;
			paymentRecurringInterval: string;
		};
		stripeStandardPlan: {
			name: string;
			description: string;
			price: number;
			paymentRecurringInterval: string;
		};
	};
	footerMenuLinks: {
		footerMenuLinks: [
			{
				node: {
					id: string;
					url: string;
					label: string;
				};
			}
		];
	};
	navbarMenuLinks: {
		navbarMenuLinks: [
			{
				node: {
					id: string;
					url: string;
					label: string;
				};
			}
		];
	};
	industriesMenuLinks: {
		industriesMenuLinks: [
			{
				node: {
					id: string;
					url: string;
					label: string;
				};
			}
		];
	};
	themesOptionsContent: {
		email: string;
		address: string;
		emailTwo: string;
		phoneNumber: string;
		phoneNumberTwo: string;
		twitterLink: string;
		facebookLink: string;
		linkedinLink: string;
		copyrightText: string;
	};
	operationalInsights: [
		{
			node: {
				id: string;
				uri: string;
				title: string;
				featuredImage: {
					node: {
						altText: string;
						sourceUrl: string;
						mediaDetails: {
							width: number;
							height: number;
						};
					};
				};
				template: {
					flexibleContent: {
						flexibleContent: [
							{
								fieldGroupName: string;
								paragraph: string;
								title: string;
							}
						];
					};
				};
			};
		}
	];
	contentSliderPostsContent: {
		content: [
			{
				uri: string;
				date: string;
				title: string;
				template: {
					flexibleContent: {
						flexibleContent: [
							{
								fieldGroupName: string;
								backgroundVideoUrl: string;
								backgroundImageOrVideo: string;
								backgroundImage: {
									altText: string;
									sourceUrl: string;
									mediaDetails: {
										height: number;
										width: number;
									};
								};
							},
							{
								fieldGroupName: string;
								paragraph: string;
								title: string;
							}
						];
					};
				};
			},
			{
				uri: string;
				date: string;
				title: string;
				template: {
					flexibleContent: {
						flexibleContent: [
							{
								fieldGroupName: string;
								backgroundVideoUrl: string;
								backgroundImageOrVideo: string;
								backgroundImage: {
									altText: string;
									sourceUrl: string;
									mediaDetails: {
										height: number;
										width: number;
									};
								};
							},
							{
								fieldGroupName: string;
								paragraph: string;
								title: string;
							}
						];
					};
				};
			},
			{
				uri: string;
				date: string;
				title: string;
				template: {
					flexibleContent: {
						flexibleContent: [
							{
								fieldGroupName: string;
								backgroundVideoUrl: string;
								backgroundImageOrVideo: string;
								backgroundImage: {
									altText: string;
									sourceUrl: string;
									mediaDetails: {
										height: number;
										width: number;
									};
								};
							},
							{
								fieldGroupName: string;
								paragraph: string;
								title: string;
							}
						];
					};
				};
			}
		];
	};
}

const signUpPage: NextPage<ISignUpPage> = ({
	seo,
	content,
	stripePlans,
	navbarMenuLinks,
	footerMenuLinks,
	industriesMenuLinks,
	operationalInsights,
	themesOptionsContent,
	contentSliderPostsContent,
}) => (
	<ContentContext.Provider
		value={{
			seo: seo,
			content: content,
			stripePlans: stripePlans,
			navbarMenuLinks: navbarMenuLinks,
			footerMenuLinks: footerMenuLinks,
			industriesMenuLinks: industriesMenuLinks,
			operationalInsights: operationalInsights,
			themesOptionsContent: themesOptionsContent,
			contentSliderPostsContent: contentSliderPostsContent,
		}}
	>
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
			className="min-h-screen bg-white bg-center bg-no-repeat bg-cover"
			style={{
				backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-blue-pink-red-yellow.svg")`,
			}}
		>
			<LayoutTwo pageTitle={`Sign Up`}>
				<section className="container flex flex-col items-center justify-center min-h-screen px-4 py-10 mx-auto overflow-hidden">
					<SignUp
						title={`Sign Up today`}
						paragraph={`We kindly request you to enter your details.`}
					/>
				</section>
			</LayoutTwo>
		</motion.div>
	</ContentContext.Provider>
);

export const getStaticProps: GetStaticProps = async () => {
	// Fetch remaining content simultaneously
	const [
		navbarMenuLinks,
		footerMenuLinks,
		industriesMenuLinks,
		themesOptionsContent,
	] = await Promise.all([
		getNavbarMenuLinks(),
		getFooterMenuLinks(),
		getIndustriesMenuLinks(),
		getThemesOptionsContent(),
	]);

	return {
		props: {
			navbarMenuLinks,
			footerMenuLinks,
			industriesMenuLinks,
			themesOptionsContent,
		},
		revalidate: 60,
	};
};

export default signUpPage;
