import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiUrl, resolveApiAssetUrl } from "../services/api";
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  isAdminUser,
} from "../services/auth";

const initialBlogForm = {
  id: "",
  title: "",
  teaser: "",
  content: "",
  author: "",
  image: null,
};

const initialSubscriptionForm = {
  id: "",
  title: "",
  price: "",
  list: "",
  image: null,
};

const parseList = (value) =>
  String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const truncateText = (value, maxChars) => {
  const text = String(value || "").trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, Math.max(0, maxChars - 3)).trim()}...`;
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

const Backoffice = () => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());

  const [blogs, setBlogs] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [blogCreateForm, setBlogCreateForm] = useState(initialBlogForm);
  const [blogEditForm, setBlogEditForm] = useState(initialBlogForm);
  const [subscriptionCreateForm, setSubscriptionCreateForm] = useState(
    initialSubscriptionForm,
  );
  const [subscriptionEditForm, setSubscriptionEditForm] = useState(
    initialSubscriptionForm,
  );

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isAdmin = useMemo(() => isAdminUser(user), [user]);

  const panelClass =
    "rounded-2xl border border-[#d9d9d9] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)]";
  const fieldClass =
    "w-full rounded-xl border border-[#d0d0d0] bg-white px-3 py-2.5 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#ef6a47]/40";
  const primaryBtnClass =
    "w-full rounded-xl bg-[#ef6a47] text-white font-semibold py-2.5 hover:bg-[#dd5633] transition-colors";
  const secondaryBtnClass =
    "rounded-lg border border-[#d0d0d0] bg-white px-3 py-1.5 text-sm font-semibold text-[#3a3a3a] hover:bg-[#f5f5f5] transition-colors";
  const dangerBtnClass =
    "rounded-lg border border-[#f4c7c1] bg-[#fff5f3] px-3 py-1.5 text-sm font-semibold text-[#c53f2a] hover:bg-[#ffe8e4] transition-colors";

  const resetFeedback = () => {
    setMessage("");
    setError("");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsRes, subscriptionsRes] = await Promise.all([
        fetch(apiUrl("blogs")),
        fetch(apiUrl("subscriptions")),
      ]);

      const [blogsJson, subscriptionsJson] = await Promise.all([
        blogsRes.json(),
        subscriptionsRes.json(),
      ]);

      setBlogs(Array.isArray(blogsJson?.data) ? blogsJson.data : []);
      setSubscriptions(
        Array.isArray(subscriptionsJson?.data) ? subscriptionsJson.data : [],
      );
    } catch (requestError) {
      setError("Kunne ikke hente backoffice data.");
      console.error(requestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const handleBlogCreateChange = (event) => {
    const { name, value, files } = event.target;
    setBlogCreateForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }));
  };

  const handleBlogEditChange = (event) => {
    const { name, value, files } = event.target;
    setBlogEditForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }));
  };

  const handleSubscriptionCreateChange = (event) => {
    const { name, value, files } = event.target;
    setSubscriptionCreateForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }));
  };

  const handleSubscriptionEditChange = (event) => {
    const { name, value, files } = event.target;
    setSubscriptionEditForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }));
  };

  const submitBlogCreate = async (event) => {
    event.preventDefault();
    resetFeedback();

    const formData = new FormData();
    formData.append("title", blogCreateForm.title);
    formData.append("teaser", blogCreateForm.teaser);
    formData.append("content", blogCreateForm.content);
    formData.append("author", blogCreateForm.author);
    if (blogCreateForm.image) formData.append("image", blogCreateForm.image);

    try {
      const response = await fetch(apiUrl("blog"), {
        method: "POST",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke oprette blog.");
      }

      setMessage("Blog oprettet.");
      setBlogCreateForm(initialBlogForm);
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke oprette blog.");
    }
  };

  const submitBlogUpdate = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!blogEditForm.id) {
      setError("Vaelg en blog at opdatere.");
      return;
    }

    const formData = new FormData();
    formData.append("id", blogEditForm.id);
    formData.append("title", blogEditForm.title);
    formData.append("teaser", blogEditForm.teaser);
    formData.append("content", blogEditForm.content);
    formData.append("author", blogEditForm.author);
    if (blogEditForm.image) formData.append("image", blogEditForm.image);

    try {
      const response = await fetch(apiUrl("blog"), {
        method: "PUT",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke opdatere blog.");
      }

      setMessage("Blog opdateret.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke opdatere blog.");
    }
  };

  const deleteBlog = async (id) => {
    resetFeedback();

    if (!window.confirm("Er du sikker pa at du vil slette denne blog?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`blog/${id}`), {
        method: "DELETE",
        headers: authHeaders(token),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke slette blog.");
      }

      setMessage("Blog slettet.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke slette blog.");
    }
  };

  const submitSubscriptionCreate = async (event) => {
    event.preventDefault();
    resetFeedback();

    const formData = new FormData();
    formData.append("title", subscriptionCreateForm.title);
    formData.append("price", subscriptionCreateForm.price);
    parseList(subscriptionCreateForm.list).forEach((item) =>
      formData.append("list", item),
    );
    if (subscriptionCreateForm.image)
      formData.append("image", subscriptionCreateForm.image);

    try {
      const response = await fetch(apiUrl("subscription"), {
        method: "POST",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke oprette abonnement.");
      }

      setMessage("Abonnement oprettet.");
      setSubscriptionCreateForm(initialSubscriptionForm);
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke oprette abonnement.");
    }
  };

  const submitSubscriptionUpdate = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!subscriptionEditForm.id) {
      setError("Vaelg et abonnement at opdatere.");
      return;
    }

    const formData = new FormData();
    formData.append("id", subscriptionEditForm.id);
    formData.append("title", subscriptionEditForm.title);
    formData.append("price", subscriptionEditForm.price);
    parseList(subscriptionEditForm.list).forEach((item) =>
      formData.append("list", item),
    );
    if (subscriptionEditForm.image)
      formData.append("image", subscriptionEditForm.image);

    try {
      const response = await fetch(apiUrl("subscription"), {
        method: "PUT",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke opdatere abonnement.");
      }

      setMessage("Abonnement opdateret.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke opdatere abonnement.");
    }
  };

  const deleteSubscription = async (id) => {
    resetFeedback();

    if (!window.confirm("Er du sikker pa at du vil slette dette abonnement?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`subscription/${id}`), {
        method: "DELETE",
        headers: authHeaders(token),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke slette abonnement.");
      }

      setMessage("Abonnement slettet.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke slette abonnement.");
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <section className="min-h-[70vh] pt-36 pb-20 px-6 bg-[#f3f3f3]">
        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#dadada] p-8 md:p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <h1 className="font-teko text-5xl md:text-6xl uppercase text-xfitgray">
            Ingen adgang
          </h1>
          <p className="mt-3 text-[#555]">
            Kun admin-brugere har adgang til backoffice.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl border border-[#111] text-sm uppercase tracking-[0.15em] hover:bg-[#111] hover:text-white transition-colors"
            >
              Til forsiden
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-xfitorange text-white text-sm uppercase tracking-[0.15em] hover:bg-[#dd5633] transition-colors"
            >
              Log ud
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-0 pb-20 min-h-screen bg-[#efefef]">
      <div className="w-full bg-gradient-to-r from-[#3c1a1a] via-[#4b201b] to-[#5a2a1d] border-y border-[#2b1411]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-ubuntu text-[#ef6a47] tracking-[0.2em] text-xs md:text-sm uppercase">
                Admin panel
              </p>
              <h1 className="font-teko text-6xl md:text-8xl uppercase text-white leading-none">
                Backoffice
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl bg-xfitorange text-white text-sm md:text-base uppercase tracking-[0.12em] hover:bg-[#dd5633] transition-colors"
              >
                Log ud
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 md:px-8 mt-8">

        {message && (
          <p className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-[#666] text-lg">Henter data...</p>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-teko text-4xl md:text-5xl text-xfitgray">
                  Blogs
                </h2>
                <span className="rounded-full bg-[#ef6a47]/10 px-3 py-1 text-xs font-bold text-[#d14e2d] uppercase tracking-[0.12em]">
                  {blogs.length} elementer
                </span>
              </div>

              <div className={`${panelClass} overflow-x-auto`}>
                <table className="w-full text-sm">
                  <thead className="bg-[#f8f8f8] text-[#2b2b2b]">
                    <tr>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Title
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Image
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Teaser
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Description
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-[#fcfcfc]">
                        <td className="p-3 border-b border-[#f0f0f0] align-top font-semibold">
                          <span title={blog.title}>{truncateText(blog.title, 36)}</span>
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top">
                          <img
                            src={resolveApiAssetUrl(blog.image)}
                            alt={blog.title}
                            className="w-24 h-16 rounded-lg object-cover border border-[#e8e8e8]"
                          />
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top text-[#4b4b4b]">
                          <span title={blog.teaser}>{truncateText(blog.teaser, 90)}</span>
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top max-w-[340px] text-[#4b4b4b]">
                          <span title={blog.content}>{truncateText(blog.content, 120)}</span>
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setBlogEditForm({
                                  id: blog._id,
                                  title: blog.title || "",
                                  teaser: blog.teaser || "",
                                  content: blog.content || "",
                                  author: blog.author || "",
                                  image: null,
                                })
                              }
                              className={secondaryBtnClass}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteBlog(blog._id)}
                              className={dangerBtnClass}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <form
                  onSubmit={submitBlogCreate}
                  className={`${panelClass} p-6 space-y-3`}
                >
                  <h3 className="font-teko text-4xl text-xfitgray leading-none">
                    Add blog
                  </h3>
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Title
                  </label>
                  <input
                    name="title"
                    value={blogCreateForm.title}
                    onChange={handleBlogCreateChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleBlogCreateChange}
                    className={fieldClass}
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Teaser
                  </label>
                  <input
                    name="teaser"
                    value={blogCreateForm.teaser}
                    onChange={handleBlogCreateChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Author
                  </label>
                  <input
                    name="author"
                    value={blogCreateForm.author}
                    onChange={handleBlogCreateChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Description
                  </label>
                  <textarea
                    name="content"
                    value={blogCreateForm.content}
                    onChange={handleBlogCreateChange}
                    className={`${fieldClass} min-h-[120px]`}
                    required
                  />
                  <button className={primaryBtnClass}>Add new blog</button>
                </form>

                <form
                  onSubmit={submitBlogUpdate}
                  className={`${panelClass} p-6 space-y-3`}
                >
                  <h3 className="font-teko text-4xl text-xfitgray leading-none">
                    Update blog
                  </h3>
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Title
                  </label>
                  <input
                    name="title"
                    value={blogEditForm.title}
                    onChange={handleBlogEditChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleBlogEditChange}
                    className={fieldClass}
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Teaser
                  </label>
                  <input
                    name="teaser"
                    value={blogEditForm.teaser}
                    onChange={handleBlogEditChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Author
                  </label>
                  <input
                    name="author"
                    value={blogEditForm.author}
                    onChange={handleBlogEditChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Description
                  </label>
                  <textarea
                    name="content"
                    value={blogEditForm.content}
                    onChange={handleBlogEditChange}
                    className={`${fieldClass} min-h-[120px]`}
                    required
                  />
                  <button className={primaryBtnClass}>Update blog</button>
                </form>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-teko text-4xl md:text-5xl text-xfitgray">
                  Subscriptions
                </h2>
                <span className="rounded-full bg-[#ef6a47]/10 px-3 py-1 text-xs font-bold text-[#d14e2d] uppercase tracking-[0.12em]">
                  {subscriptions.length} elementer
                </span>
              </div>

              <div className={`${panelClass} overflow-x-auto`}>
                <table className="w-full text-sm">
                  <thead className="bg-[#f8f8f8] text-[#2b2b2b]">
                    <tr>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Title
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Image
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Price
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        List
                      </th>
                      <th className="text-left p-3 border-b border-[#ececec]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription._id} className="hover:bg-[#fcfcfc]">
                        <td className="p-3 border-b border-[#f0f0f0] align-top font-semibold">
                          <span title={subscription.title}>{truncateText(subscription.title, 34)}</span>
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top">
                          <img
                            src={resolveApiAssetUrl(subscription.image)}
                            alt={subscription.title}
                            className="w-24 h-16 rounded-lg object-cover border border-[#e8e8e8]"
                          />
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top text-[#4b4b4b]">
                          {subscription.price}
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top text-[#4b4b4b]">
                          <span title={(subscription.list || []).join(", ")}>
                            {truncateText((subscription.list || []).join(", "), 120)}
                          </span>
                        </td>
                        <td className="p-3 border-b border-[#f0f0f0] align-top">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSubscriptionEditForm({
                                  id: subscription._id,
                                  title: subscription.title || "",
                                  price: String(subscription.price ?? ""),
                                  list: (subscription.list || []).join("\n"),
                                  image: null,
                                })
                              }
                              className={secondaryBtnClass}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                deleteSubscription(subscription._id)
                              }
                              className={dangerBtnClass}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <form
                  onSubmit={submitSubscriptionCreate}
                  className={`${panelClass} p-6 space-y-3`}
                >
                  <h3 className="font-teko text-4xl text-xfitgray leading-none">
                    Add subscription
                  </h3>
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Title
                  </label>
                  <input
                    name="title"
                    value={subscriptionCreateForm.title}
                    onChange={handleSubscriptionCreateChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleSubscriptionCreateChange}
                    className={fieldClass}
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={subscriptionCreateForm.price}
                    onChange={handleSubscriptionCreateChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    List (one per line)
                  </label>
                  <textarea
                    name="list"
                    value={subscriptionCreateForm.list}
                    onChange={handleSubscriptionCreateChange}
                    className={`${fieldClass} min-h-[120px]`}
                  />
                  <button className={primaryBtnClass}>Add subscription</button>
                </form>

                <form
                  onSubmit={submitSubscriptionUpdate}
                  className={`${panelClass} p-6 space-y-3`}
                >
                  <h3 className="font-teko text-4xl text-xfitgray leading-none">
                    Update subscription
                  </h3>
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Title
                  </label>
                  <input
                    name="title"
                    value={subscriptionEditForm.title}
                    onChange={handleSubscriptionEditChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleSubscriptionEditChange}
                    className={fieldClass}
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={subscriptionEditForm.price}
                    onChange={handleSubscriptionEditChange}
                    className={fieldClass}
                    required
                  />
                  <label className="block text-sm font-semibold text-[#4b4b4b]">
                    List (one per line)
                  </label>
                  <textarea
                    name="list"
                    value={subscriptionEditForm.list}
                    onChange={handleSubscriptionEditChange}
                    className={`${fieldClass} min-h-[120px]`}
                  />
                  <button className={primaryBtnClass}>
                    Update subscription
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Backoffice;
