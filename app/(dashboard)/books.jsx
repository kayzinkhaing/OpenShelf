import { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { useBooks } from '../../hooks/useBooks';
import { useRouter } from 'expo-router';

import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import ThemedCard from '../../components/ThemedCard';

// ——— Optional fallback data (only used if useBooks returns empty) ———
const FALLBACK_BOOKS = [
  { $id: '1', title: 'The Midnight Library', author: 'Matt Haig', status: 'Reading', genre: 'Fiction' },
  { $id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'Completed', genre: 'Self-help' },
  { $id: '3', title: 'Dune', author: 'Frank Herbert', status: 'Want to Read', genre: 'Sci-Fi' },
  { $id: '4', title: 'The Silent Patient', author: 'Alex Michaelides', status: 'Completed', genre: 'Thriller' },
  { $id: '5', title: 'The Alchemist', author: 'Paulo Coelho', status: 'Reading', genre: 'Fiction' },
  { $id: '6', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'Want to Read', genre: 'Psychology' },
  { $id: '7', title: 'Project Hail Mary', author: 'Andy Weir', status: 'Completed', genre: 'Sci-Fi' },
  { $id: '8', title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', status: 'Reading', genre: 'Fiction' },
  { $id: '9', title: 'Sapiens', author: 'Yuval Noah Harari', status: 'Completed', genre: 'History' },
  { $id: '10', title: 'The Vanishing Half', author: 'Brit Bennett', status: 'Want to Read', genre: 'Fiction' },
  { $id: '11', title: 'Educated', author: 'Tara Westover', status: 'Completed', genre: 'Memoir' },
  { $id: '12', title: 'The Song of Achilles', author: 'Madeline Miller', status: 'Reading', genre: 'Fiction' },
  { $id: '13', title: 'Becoming', author: 'Michelle Obama', status: 'Completed', genre: 'Memoir' },
  { $id: '14', title: 'The Four Agreements', author: 'Don Miguel Ruiz', status: 'Want to Read', genre: 'Self-help' },
  { $id: '15', title: 'Circe', author: 'Madeline Miller', status: 'Completed', genre: 'Fiction' },
];

const Books = () => {
  const { books: fetchedBooks } = useBooks(); // your original hook
  const router = useRouter();

  // Use fetched data if available, otherwise fallback
  const books = fetchedBooks?.length ? fetchedBooks : FALLBACK_BOOKS;

  // ——— Local UI state (filtering) ———
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // ——— Filter books locally (no API change) ———
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || book.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // ——— Helper: generate a gradient from a string ———
  const getGradientColors = (seed) => {
    const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue1 = (hash * 37) % 360;
    const hue2 = (hue1 + 60) % 360;
    return [`hsl(${hue1}, 70%, 60%)`, `hsl(${hue2}, 70%, 50%)`];
  };

  // ——— Status badge styles (safe even if status is missing) ———
  const getStatusStyle = (status) => {
    const styles = {
      Reading: { label: '📖 Reading', color: '#3B82F6', bg: '#EFF6FF' },
      Completed: { label: '✅ Completed', color: '#10B981', bg: '#ECFDF5' },
      'Want to Read': { label: '⭐ Want to Read', color: '#F59E0B', bg: '#FFFBEB' },
    };
    return styles[status] || { label: status || '📚', color: '#6B7280', bg: '#F3F4F6' };
  };

  // ——— Render each book ———
  const renderBookItem = ({ item }) => {
    const gradientColors = getGradientColors(item.title);
    const statusStyle = getStatusStyle(item.status);

    return (
      <Pressable
        onPress={() => router.push(`/books/${item.$id}`)}
        style={({ pressed }) => [
          styles.pressableItem,
          pressed && styles.cardPressed,
        ]}
      >
        <ThemedCard style={styles.card}>
          <View style={styles.cardContent}>
            {/* Cover placeholder */}
            <View style={[styles.coverPlaceholder, { backgroundColor: gradientColors[0] }]}>
              <ThemedText style={styles.coverLetter}>
                {item.title.charAt(0).toUpperCase()}
              </ThemedText>
            </View>

            <View style={styles.textContainer}>
              <ThemedText style={styles.title} numberOfLines={2}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.author} numberOfLines={1}>
                by {item.author}
              </ThemedText>

              {/* Optional meta row: genre + status */}
              <View style={styles.metaRow}>
                {item.genre && (
                  <ThemedText style={styles.genre}>{item.genre}</ThemedText>
                )}
                {item.status && (
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <ThemedText style={[styles.statusText, { color: statusStyle.color }]}>
                      {statusStyle.label}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ThemedCard>
      </Pressable>
    );
  };

  // ——— Category chips (only if status exists in at least one book) ———
  const hasStatus = books.some((b) => b.status);
  const categories = hasStatus ? ['All', 'Reading', 'Completed', 'Want to Read'] : ['All'];

  return (
    <ThemedView style={styles.container} safe={true}>
      {/* ——— Header ——— */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.heading}>📚 Your Library</ThemedText>
          <ThemedText style={styles.subheading}>
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </ThemedText>
        </View>
      </View>

      {/* ——— Search Bar ——— */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title…"
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ——— Category Chips (if statuses exist) ——— */}
      {hasStatus && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedStatus(cat)}
              style={({ pressed }) => [
                styles.chip,
                selectedStatus === cat && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
            >
              <ThemedText
                style={[
                  styles.chipText,
                  selectedStatus === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ——— Book List ——— */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderBookItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No books found. Try a different search or filter.
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
};

export default Books;

// ——— Styles ———
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  // Search
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInput: {
    height: 44,
    borderRadius: 30,
    paddingHorizontal: 18,
    backgroundColor: '#F1F5F9',
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  // Chips
  chipScroll: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  chipPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },

  // List
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  separator: {
    height: 12,
  },

  // Card
  pressableItem: {
    borderRadius: 20,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverPlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  coverLetter: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
  },
  author: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  genre: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Empty state
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
});