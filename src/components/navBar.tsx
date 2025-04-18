import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";

const NavBar = () => {
	return (
		<div className="bg-white flex-col w-full py-4 sticky top-0">
			<div className="flex justify-center">
				<NavigationMenu>
					<NavigationMenuList className="flex space-x-8">
						<NavigationMenuItem>
							<NavigationMenuLink href="/">
								News
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="/analysis">
								Analysis
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="/calendar">
								Calendar
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
}

export default NavBar;
