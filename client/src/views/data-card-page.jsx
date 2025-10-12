import { AllVenuesMap } from "../components/venue-map";
import { ArtistCards, NavButton, PageContent, PageElement, VenueCards } from "../components/multiuse-elements";
import styles from "../css/data-cards.module.css";
import { useEffect, useState } from "react";

export default function DataCardPage() {
	const [cardPack, setCardPack] = useState();
	const [subTitle, setSubTitle] = useState();
	const [renderMap, setRenderMap] = useState(false);
	const dataType = window.location.pathname.substring(1);

	useEffect(() => {
		if (dataType == "venues") {
			setSubTitle("venue-list");
			setCardPack(VenueCards);
			setRenderMap(true);
		} else {
			setSubTitle();
			setCardPack(ArtistCards);
		}
	}, []);

	if (!cardPack) {
		return <PageContent />;
	}

	return (
		<PageContent page={dataType}>
			{renderMap && (
				<PageElement subclass={styles.allVenuesMap}>
					<AllVenuesMap />
				</PageElement>
			)}
			<PageElement title={subTitle}>
				<div className={styles.cardHolder}>
					{cardPack.map((card, i) => {
						return (
							<div className={styles.dataCard} key={i}>
								<img src={card.imagePath} />
								<h2>{card.name}</h2>
								<p>{card.bio}</p>
								<NavButton content={card.buttonContent} />
							</div>
						);
					})}
				</div>
			</PageElement>
		</PageContent>
	);
}
