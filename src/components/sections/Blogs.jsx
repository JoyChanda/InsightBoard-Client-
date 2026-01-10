import { motion } from "framer-motion";
import { blogPosts } from "../../data/blogPosts";

const Blogs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogPosts.map((post, idx) => (
        <motion.div
          key={post.id}
          whileHover={{ y: -10 }}
          className="card bg-base-100 border border-base-300 overflow-hidden shadow-sm hover:shadow-xl transition-all"
        >
          <figure className="h-48">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </figure>
          <div className="p-6">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
            <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">{post.title}</h3>
            <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-base-300">
              <span className="text-xs font-semibold opacity-60">By {post.author}</span>
              <span className="text-xs opacity-60">{post.date}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Blogs;
