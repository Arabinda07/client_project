import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Eye, EyeOff, Plus, Search } from 'lucide-react';
import { buttonClassNames } from '../../components/ui/Button';
import { inputClassName } from '../../components/ui/formStyles';
import { fetchAdminProducts, updateAdminProductVisibility, type AdminProductListItem } from '../../lib/adminData';
import { formatPrice } from '../../lib/utils';

const fromPaise = (value: number) => value / 100;

export const AdminProducts = () => {
  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setIsLoading(true);
    setError('');
    try {
      setProducts(await fetchAdminProducts());
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((product) =>
      [product.name, product.sku, product.slug, product.categoryName, product.subcategory]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery))
    );
  }, [products, query]);

  const toggleVisibility = async (product: AdminProductListItem) => {
    setError('');
    try {
      await updateAdminProductVisibility(product.id, !product.is_active);
      await loadProducts();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to update product visibility.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-terracotta-dark type-overline">Catalog</p>
          <h1 className="type-h1 text-gray-900">Products</h1>
        </div>
        <Link to="/admin/products/new" className={buttonClassNames({ className: 'gap-2' })}>
          <Plus size={16} />
          New product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[2px] border border-border-soft bg-surface p-5">
          <p className="type-overline text-gray-500">Total</p>
          <p className="numeric-tabular mt-2 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-[2px] border border-border-soft bg-surface p-5">
          <p className="type-overline text-gray-500">Visible</p>
          <p className="numeric-tabular mt-2 text-3xl font-bold">{products.filter((product) => product.is_active).length}</p>
        </div>
        <div className="rounded-[2px] border border-border-soft bg-surface p-5">
          <p className="type-overline text-gray-500">Low stock</p>
          <p className="numeric-tabular mt-2 text-3xl font-bold">{products.filter((product) => product.stock_quantity <= product.low_stock_threshold).length}</p>
        </div>
      </div>

      <div className="rounded-[2px] border border-border-soft bg-surface">
        <div className="flex flex-col gap-4 border-b border-border-soft p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input
              id="product-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className={inputClassName('pl-10')}
            />
          </div>
          {error && <p className="text-sm font-semibold text-terracotta-dark" role="alert">{error}</p>}
        </div>

        {isLoading ? (
          <div className="p-8 text-terracotta-dark type-overline">Loading products</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-gray-500 type-body">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-soft text-left">
              <thead className="bg-studio-wash/50">
                <tr className="type-overline text-gray-500">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="align-middle">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-11 overflow-hidden rounded-[2px] border border-border-soft bg-studio-wash">
                          {product.primaryImageUrl ? (
                            <img src={product.primaryImageUrl} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="numeric-tabular text-xs text-gray-500">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.categoryName || 'Unassigned'} / {product.subcategory || 'No style'}</td>
                    <td className="numeric-tabular px-4 py-4 text-sm font-semibold">{formatPrice(fromPaise(product.price_inr_paise))}</td>
                    <td className="numeric-tabular px-4 py-4 text-sm">{product.stock_quantity}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-[2px] border border-border-soft bg-warm-ivory px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gray-700">
                        {product.is_active ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleVisibility(product)}
                          className="flex min-h-11 min-w-11 items-center justify-center rounded-[2px] border border-border-soft text-gray-600 transition-colors hover:border-terracotta hover:text-terracotta"
                          aria-label={product.is_active ? `Hide ${product.name}` : `Show ${product.name}`}
                        >
                          {product.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="flex min-h-11 min-w-11 items-center justify-center rounded-[2px] border border-border-soft text-gray-600 transition-colors hover:border-terracotta hover:text-terracotta"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit3 size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
