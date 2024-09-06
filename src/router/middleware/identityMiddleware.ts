import useRouter from "@/service/plugins/routerProvidePlugin";
import { useUser } from "@/service/plugins/userStatePlugin";
import { type RouteLocationNormalized } from "vue-router";

export default function identityMiddleware(route: RouteLocationNormalized) {
	if (route.meta.authorized !== undefined) {
		const user = useUser();
		const router = useRouter();

		if (user?.isAuthorized != route.meta.authorized) return router?.push("/");
		if (route.meta.roles !== undefined && route.meta.roles.length > 0) {
			route.meta.roles.map((role) => {
				if (!user.roles.includes(role)) return router?.push("/");
			});
		}
	}
}
