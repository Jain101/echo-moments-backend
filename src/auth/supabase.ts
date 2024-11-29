import { supabase } from "../constants";

export async function signUpNewUser(
  email: string,
  password: string,
  name: string
): Promise<{ user: any; session: any; error?: any; data?: any }> {
  const names = name.split(" ");
  const first_name = names[0];
  const last_name = names.length > 1 ? names[1] : "";
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173",
        data: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}

export async function signInUser(
  email: string,
  password: string
): Promise<{ user: any; session: any; error?: any; data?: any }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}

export async function signOutUser(): Promise<any> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}

export async function resetPassword(email: string): Promise<any> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}
