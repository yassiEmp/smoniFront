
export interface ServiceSwitchButtonType {
	id: string;
	text: string;
}

export interface ServiceSwitchSubbuttonPropsType {
	item: {
		id: string;
		text: string;
	},
	activeSub: string,
	setActiveSub: (activeSub: string) => void
}

export interface PricingCardPropsType {
	id: string,
	title: string,
	price: number,
	unit?: string,
	list: ListServiceType[]
}

export interface ListServiceType {
	id: string,
	text: string,
	valide: boolean
}