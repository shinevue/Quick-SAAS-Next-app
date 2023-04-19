// Import
import {motion} from "framer-motion";
import {
	getMainMenuLinks,
	getNavbarMenuLinks,
	getFooterMenuLinks,
	getIndustriesMenuLinks,
} from "../../functions/MenuLinks";
import {
	fetchIndustriesPageSlugs,
	fetchIndustriesPageContent,
} from "../../functions/IndustriesPageSlugs";
import {getThemesOptionsContent} from "../../functions/themesOptions";

// Components
import CTATwo from "../../components/CTATwo";
import HeroThree from "../../components/HeroThree";
import Layout from "../../components/Layout/Layout";
import TitleParagraph from "../../components/TitleParagraph";

const singlePost = ({
	seo,
	content,
	pageTitle,
	mainMenuLinks,
	navbarMenuLinks,
	footerMenuLinks,
	industriesMenuLinks,
	themesOptionsContent,
}: any) => {
	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
		>
			<Layout
				seo={seo}
				pageTitle={pageTitle}
				themesOptionsContent={themesOptionsContent}
				footerMenuLinks={footerMenuLinks?.footerMenuLinks}
				navbarMenuLinks={navbarMenuLinks?.navbarMenuLinks}
				industriesMenuLinks={industriesMenuLinks?.industriesMenuLinks}
			>
				<HeroThree
					title={content?.heroSection?.title}
					paragraph={content?.heroSection?.paragraph}
					backgroundImage={content?.heroSection?.backgroundImage}
					backgroundVideoUrl={content?.heroSection?.backgroundVideoUrl}
					backgroundImageOrVideo={content?.heroSection?.backgroundImageOrVideo}
				/>

				<TitleParagraph
					title={content?.titleParagraph?.title}
					paragraph={content?.titleParagraph?.paragraph}
				/>

				<CTATwo
					title={content?.cta?.title}
					paragraph={content?.cta?.paragraph}
					buttonLink={content?.cta?.buttonLink}
					backgroundImage={content?.cta?.backgroundImage?.sourceUrl}
				/>
			</Layout>
		</motion.div>
	);
};

export default singlePost;

export async function getStaticPaths() {
	const data = await fetchIndustriesPageSlugs();

	const paths = data.map((slugUrl) => ({
		params: {
			slug: slugUrl?.slug as String,
		},
	}));

	return {paths, fallback: false};
}

export async function getStaticProps({params}: any) {
	const response: any = await fetchIndustriesPageContent(params?.slug);

	const mainMenuLinks: object = await getMainMenuLinks();
	const navbarMenuLinks: object = await getNavbarMenuLinks();
	const footerMenuLinks: object = await getFooterMenuLinks();
	const industriesMenuLinks: object = await getIndustriesMenuLinks();
	const themesOptionsContent: object = await getThemesOptionsContent();

	return {
		props: {
			mainMenuLinks,
			navbarMenuLinks,
			footerMenuLinks,
			industriesMenuLinks,
			themesOptionsContent,
			seo: response?.seo,
			content: response?.content,
			pageTitle: response?.pageTitle,
		},
		revalidate: 60,
	};
}